from pyramid.view import view_config
from pyramid.response import Response
from .models import DBSession
from .models.transaction import Transaction
import json

@view_config(route_name='api_transactions', renderer='json', request_method='GET')
def get_transactions(request):
    transactions = DBSession.query(Transaction).all()
    return [
        {
            'id': t.id,
            'user_id': t.user_id,
            'type': t.type,
            'category': t.category,
            'amount': t.amount,
            'date': t.date.isoformat()
        } for t in transactions
    ]