from flask import Blueprint

route_api=Blueprint("api_page",__name__)
from web.controllers.api.Member import *
from web.controllers.api.Course import *
from web.controllers.api.Setting import *
@route_api.route("/")
def index():
    return "my api"