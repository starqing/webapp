# -*- coding: utf-8 -*-
SERVER_PORT = 8999
DEBUG = True
SQLALCHEMY_ECHO = False

AUTH_COOKIE_NAME = "username"
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost:3306/wxapp?charset=utf8'
SQLALCHEMY_TRACK_MODIFICATIONS = True
##过滤url
IGNORE_URLS = [
    "^/user/login"
]

IGNORE_CHECK_LOGIN_URLS = [
    "^/static",
    "^/favicon.ico"
]

API_IGNORE_URLS = [
    "^/api"
]

MINA_APP = {
    'appid':'wx51f421b8c03d5c5b',
    'appkey':'1bcd51c7bdf54aa7e0a9bdc28c5b8380',
    'paykey':'xxxxxxxxxxxxxx换自己的',
    'mch_id':'xxxxxxxxxxxx换自己的',
    'callback_url':'/api/order/callback'
}
PAGE_SIZE = 50
PAGE_DISPLAY = 10

STATUS_MAPPING = {
    "1":"正常",
    "0":"已删除"
}

UPLOAD = {
    'ext':[ 'jpg','gif','bmp','jpeg','png' ],
    'prefix_path':'/web/static/upload/',
    'prefix_url':'/static/upload/'
}
APP = {
    'domain':'http://127.0.0.1:8999'
}
