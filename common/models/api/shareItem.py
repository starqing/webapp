# coding: utf-8
from sqlalchemy import BigInteger, Column, DateTime, Integer, Numeric, String
from sqlalchemy.schema import FetchedValue
from flask_sqlalchemy import SQLAlchemy

from application import db


class ShareItem(db.Model):
    __tablename__ = 'share_item'

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.BigInteger, nullable=False, index=True, server_default=db.FetchedValue())
    parent_id = db.Column(db.BigInteger, nullable=False, server_default=db.FetchedValue())
    tree = db.Column(db.String(10000), nullable=False, index=True, server_default=db.FetchedValue())
    money = db.Column(db.Numeric(10, 2), nullable=False, server_default=db.FetchedValue())
    level = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    CREATE_TIME = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    UPDATE_TIME = db.Column(db.DateTime, nullable=False)
