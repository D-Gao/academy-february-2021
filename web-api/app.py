import traceback
from http.client import HTTPException

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from repository.case_disrtribution_repository import CaseDistributionRepository
from utils.constants import DB_CONNECTION

app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False
app.config['SQLALCHEMY_DATABASE_URI'] = DB_CONNECTION
db = SQLAlchemy(app)

case_distribution_repository = CaseDistributionRepository(db_engine=db.engine)

@app.route('/')
def index():
    return "Techedge Academy - February 2021 - v1.2"


@app.route('/case', methods=["GET"])
def get_cases():
    from_date = request.args.get('from')
    to_date = request.args.get('to')
    country = request.args.get('country')
    result = case_distribution_repository.get_cases(from_date=from_date,to_date=to_date, country=country)
    return jsonify(result)


@app.route('/case/<int:case_id>', methods=["GET"])
def get_case(case_id):
    result = case_distribution_repository.get_case(case_id)
    return jsonify(result)


@app.route('/case-summary', methods=["GET"])
def get_case_summary():
    from_date = request.args.get('from')
    to_date = request.args.get('to')
    country = request.args.get('country')
    result = case_distribution_repository.get_cases_summary(from_date=from_date,to_date=to_date, country=country)
    return jsonify(result)


@app.route('/case', methods=["POST"])
def post_case():
    case_data = request.json
    result = case_distribution_repository.insert_case(case_data)
    return jsonify(result)


@app.route('/case', methods=["PUT"])
def put_case():
    case_data = request.json
    result = case_distribution_repository.update_case(case_data)
    return jsonify(result)


@app.route('/case/<int:case_id>', methods=["DELETE"])
def delete_case(case_id):
    result = case_distribution_repository.delete_case(case_id)
    return jsonify(result)


@app.route('/countries', methods=["GET"])
def get_countries():
    result = case_distribution_repository.get_countries()
    return jsonify(result)


@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return e

    print("[Application error]", e)
    print(traceback.format_exc())
    return {
        "state": "Failed",
        "message": "Unexpected server error"
    }, 500


if __name__ == '__main__':
    app.run(debug=True)
