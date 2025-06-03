from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
import transaction

DBSession = scoped_session(sessionmaker(extension=transaction.TransactionExtension()))
Base = declarative_base()