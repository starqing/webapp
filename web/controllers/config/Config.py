# -*- coding: utf-8 -*-
from flask import Blueprint,request,redirect,jsonify
from common.models.Setting import Setting
from common.libs.Helper import ops_render,iPagination,getCurrentDate
from application import app,db

route_config = Blueprint( 'config_page',__name__ )

@route_config.route( "/index" ,methods = [ 'GET','POST'])
def index():
    if request.method == "GET":
        resp_data = {}
        req = request.args
        info = Setting.query.first()
        app.logger.info(info)
        if info.banner:
            banners=info.banner.split(",")
        else:
            banners=None
        resp_data['info'] = info
        resp_data['banners']=banners
        app.logger.info(banners)
        return ops_render( "config/index.html" ,resp_data)

    resp = {'code': 200, 'msg': '操作成功~~', 'data': {}}
    req = request.values
    app.logger.info(req)
    name = req['name'] if 'name' in req else ''
    address=req['address'] if 'address' in req else ''
    summary=req['summary'] if 'summary' in req else ''
    subtitle=req['subtitle'] if 'subtitle' in req else ''
    banner_image=req['banner_image'] if 'banner_image' in req else ''
    tel=req['tel'] if 'tel' in req else ''

    if name is None or len(name) < 1:
        resp['code'] = -1
        resp['msg'] = "请输入符合规范的名称~~"
        return jsonify(resp)


    if summary is None or len(summary) < 3:
        resp['code'] = -1
        resp['msg'] = "请输入课程描述，并不能少于10个字符~~"
        return jsonify(resp)

    if subtitle is None or len(subtitle) < 3:
        resp['code'] = -1
        resp['msg'] = "请输入副标题，并不能少于10个字符~~"
        return jsonify(resp)
    if tel is None or len(tel) < 3:
        resp['code'] = -1
        resp['msg'] = "请输入手机号码，并不能少于10个字符~~"
        return jsonify(resp)
    Setting_info = Setting.query.first()
    if Setting_info:
        app.logger.info("xxxxxxxxxxxxxx")
        model_setting = Setting_info
    else:
        Setting_info=Setting()
    Setting_info.announce=summary
    Setting_info.tel=tel
    Setting_info.position=address
    Setting_info.subtitle=subtitle
    Setting_info.banner=banner_image
    Setting_info.name=name

    db.session.add(Setting_info)
    ret = db.session.commit()
    return jsonify(resp)