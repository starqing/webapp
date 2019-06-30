from web.controllers.api import route_api
from flask import request,jsonify
from application import app,db
import requests,json
from json import loads
from common.models.Setting import Setting
from common.libs.Helper import ops_render,iPagination,getCurrentDate

@route_api.route("/setting/index",methods = [ "GET" ])
def setting_index():
    resp = {'code': 200, 'msg': '操作成功~', 'data': {},'banners':{}}
    info = Setting.query.first()
    if info.banner:
        banners = info.banner.split(",")
    else:
        banners = None
    # new_address=""
    # if r"\\" in info.position:
    #     new_replace=""
    #     new_address=info.position.replace(r'\\',new_replace)
    # app.logger.info(new_address)
    # app.logger.info(info.position)
    # app.logger.info('xxxxxxxxxxxxxxx')
    # app.logger.info(type(loads(info.position)))



    resp['data']['info'] = {
        "name":info.name,
        "announce":info.announce,
        'banners':banners,
        "tel":info.tel,
        "subtitle":info.subtitle,
        "address":loads(info.position)
    }
    return jsonify(resp)


