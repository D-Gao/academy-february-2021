FROM python:3.6.4-slim-jessie
COPY web-api/requirements.txt /

RUN pip install -r /requirements.txt
COPY web-api/ /web-api

WORKDIR /web-api
CMD ["gunicorn"  , "-b", "0.0.0.0:8000","--timeout","3600","-w","4","--threads=2","app:app"]