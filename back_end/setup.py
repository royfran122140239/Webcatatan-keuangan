from setuptools import setup

setup(
    name='catatduit_backend',
    install_requires=[
        'pyramid',
        'pyramid_tm',
        'sqlalchemy',
        'psycopg2-binary',
        'alembic',
        'python-dotenv',
        'pyramid_jinja2',
        'waitress',
        'cornice'  # untuk REST API
    ],
    entry_points={
        'paste.app_factory': [
            'main = app:main'
        ],
    },
)