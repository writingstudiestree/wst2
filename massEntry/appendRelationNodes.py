import sqlalchemy as db
import pandas as pd
from sqlalchemy import insert
from sqlalchemy import select
def checkRelationColumns(relationDF):
    if 'id' not in relationDF.columns:
        raise Exception("id is a required column in the content table")
    if 'type' not in relationDF.columns:
        raise Exception("type is a required column in the content table")
    if 'subtype' not in relationDF.columns:
        raise Exception("subtype is a required column in the content table")
    if 'link_from' not in relationDF.columns:
        raise Exception("link_from is a required column in the content table")
    if 'link_to' not in relationDF.columns:
        raise Exception("link_to is a required column in the content table")
    if 'year_start' not in relationDF.columns:
        raise Exception("year_start is a required column in the content table")
    if 'year_end' not in relationDF.columns:
        raise Exception("year_end is a required column in the content table")
        
def main():
    print("spagetti")

    # specify database configurations
    config = {
        'host': 'localhost',
        'port': 3306,
        'user': 'root',
        'password': 'abcdefg123',
        'database': 'wst'
    }

    db_user = config.get('user')
    db_pwd = config.get('password')
    db_host = config.get('host')
    db_port = config.get('port')
    db_name = config.get('database')

    table_name = "relations"

    # specify connection string
    connection_str = f'mysql+pymysql://{db_user}:{db_pwd}@{db_host}:{db_port}/{db_name}'
    # connect to database
    engine = db.create_engine(connection_str)
    connection = engine.connect()
    # pull metadata of a table
    metadata = db.MetaData(bind=engine)
    metadata.reflect(only=[table_name])
    content_table = metadata.tables[table_name]

    #pandas
    name_of_relation_csv = "massEntry/testRelation.csv"
    relationDF = pd.read_csv (name_of_relation_csv)
    checkRelationColumns(relationDF)

    for index, row in relationDF.iterrows():
        connection = engine.connect()
        contents = {}
        stmt = insert(content_table).values(type=row['type'], 
        subtype=row['subtype'], link_from=row['link_from'], link_to=row['link_to'],
        year_start=row['year_start'], year_end=2090, content=contents
        )
        compiled = stmt.compile()
    
        with connection as conn:
           result = conn.execute(stmt)

    connection = engine.connect()
    stmt = select(content_table)
    print(stmt)
    with connection as conn:
        result = conn.execute(stmt)
        for row in result:
            print(row)

if __name__ == "__main__":
    main()