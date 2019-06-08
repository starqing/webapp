from web.controllers.api import route_api
from flask import request,jsonify,g
from application import app,db
import requests,json
from common.libs.UrlManager import UrlManager
from common.libs.Helper import getCurrentDate,getDictFilterField,selectFilterObj
from common.models.food.FoodCat import  FoodCat
from common.models.food.Food import  Food
from common.libs.Helper import getCurrentDate
from  common.libs.Helper import datetime_toString
@route_api.route("/course/index",methods = [ "GET","POST" ])
def course_index():
    '''返回首页的banner信息以及相应的课程'''
    resp = { 'code':200 ,'msg':'操作成功~','data':{} }
    food_list = Food.query.filter_by( status = 1 )\
        .order_by( Food.total_count.desc(),Food.id.desc() ).limit(5).all()
    data_food_list = []
    if food_list:
        for item in food_list:
            tmp_data = {
                'id':item.id,
                'pic_url':UrlManager.buildImageUrl( item.main_image ),
                'food_name':item.name,
                'total':item.total_count
            }
            data_food_list.append( tmp_data )

    resp['data']['banner_list'] = data_food_list
    return jsonify( resp )

@route_api.route("/course/class",methods=["GET","POST"])
def course_cat():
    resp = {'code': 200, 'msg': '操作成功~', 'data': {}}
    query = FoodCat.query
    query = query.filter(FoodCat.status == 1)
    list = query.order_by(FoodCat.weight.desc(), FoodCat.id.desc()).all()
    resp['data']['list']=list
    temp_id=[]
    temp_name=[]
    if len(list)==0:
        resp['msg']='没有课程！'
        resp['code']='201'
        return jsonify(resp)
    data_food_list = []
    if list:
        for item in list:
            tmp_data = {
                'id': item.id,
                'name': "%s" % (item.name),
            }
            data_food_list.append(tmp_data)
    resp['data']['list'] = data_food_list
    return jsonify(resp)






@route_api.route("/course/search",methods = [ "GET","POST" ])
def course_search():
    resp = {'code': 200, 'msg': '操作成功~', 'data': {}}
    req = request.values
    cat_id = int( req['cat_id'] ) if 'cat_id' in req else 0
    p = int(req['p']) if 'p' in req else 1
    if p < 1:
        p = 1

    page_size = 10
    offset = ( p - 1 ) * page_size
    query = Food.query.filter_by(status=1 )
    if cat_id > 0:
        query = query.filter_by(cat_id=cat_id)
    food_list = query.order_by(Food.total_count.desc(), Food.id.desc()) \
        .offset(offset).limit(page_size).all()
    data_food_list = []
    if food_list:
        for item in food_list:
            tmp_data = {
                'id': item.id,
                'name': "%s" % (item.name),
                'pic_url': UrlManager.buildImageUrl(item.main_image),
                'totle':item.total_count
            }
            data_food_list.append(tmp_data)
    resp['data']['list'] = data_food_list
    resp['data']['has_more'] = 0 if len(data_food_list) < page_size else 1
    return jsonify(resp)

@route_api.route("/course/info" )
def Course_Info():
    resp = {'code': 200, 'msg': '操作成功~', 'data': {}}
    req = request.values
    id = int(req['id']) if 'id' in req else 0
    food_info = Food.query.filter_by( id = id ).first()
    if not food_info or not food_info.status :
        resp['code'] = -1
        resp['msg'] = "课程已下架"
        return jsonify(resp)

    member_info = g.member_info

    if member_info:
        app.logger.info(member_info)

    temp_time=food_info.start_time
    if temp_time=='0000-00-00':
        temp_time='无'
    app.logger.info(type(temp_time))
    resp['data']['info'] = {
        "id":food_info.id,
        "name":food_info.name,
        "summary":food_info.summary,
        "total_count":food_info.total_count,
        "comment_count":food_info.comment_count,
        "start_time":temp_time,
        'main_image':UrlManager.buildImageUrl( food_info.main_image ),
        "price":str( food_info.price ),
        "stock":food_info.stock,
        "pics":[ UrlManager.buildImageUrl( food_info.main_image ) ]
    }
    return jsonify(resp)
