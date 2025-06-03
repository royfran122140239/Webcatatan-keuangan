from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import DBSession, Base
import os
from dotenv import load_dotenv

load_dotenv()

def main(global_config, **settings):
    config = Configurator(settings=settings)
    
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config.include('pyramid_jinja2')
    config.include('pyramid_tm')
    config.include('cornice')
    
    config.include('.routes')
    config.scan()

    return config.make_wsgi_app()