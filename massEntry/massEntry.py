import sqlalchemy as db
import pandas as pd
from sqlalchemy import insert
from sqlalchemy import select

    #   Content CSV schema: 
    #   -col1 must be 'id' and contain unique integers.
    #   -col2 must be 'type' and be a lowercase string "person", "school", or "institution"
    #   -col3 must be 'name' and be a string (of any case)
    #   -all subsequent columns must be members of that type's content group. For example,
    #   an "OrcId" column is appropriate anywhere where the row is "person", but not for "schools"
    #
    #   Relation CSV schema:
    #   -col1 must be 'id' and contain unique integers.
    #   -col2 must be 'type' and contain 'mentored', 'studied at', 'worked at', 'worked alongside', or 'served on'
    #   -col3 must be 'subtype', and can be any string (but we prefer those selectable on our website)
    #   -col4 must be 'link_from' and contain an id from the previous content table
    #   -col5 must be 'link_to' and contain an id from the previous content table
    #   -col6 must be 'year_start' and contain an int
    #   -col7 must be 'year_end' and contain either an int or NaN (or 0, which will be interpreted as NaN)
    #   -subsequent columns can contain content groups, such as description or department

def checkContentColumns(contentDF):
    if 'id' not in contentDF.columns:
        raise Exception("id is a required column in the content table")
    if 'type' not in contentDF.columns:
        raise Exception("type is a required column in the content table")
    if 'name' not in contentDF.columns:
        raise Exception("name is a required column in the content table")

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

def checkRelationValidity(contentDF, relationDF):
    print("TODO")

def main():

    #https://medium.com/swlh/how-to-connect-to-mysql-docker-from-python-application-on-macos-mojave-32c7834e5afa

    ############ Connect to the database ############

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

    table_name = "content"
    relation_name = "relations"

    # specify connection string
    connection_str = f'mysql+pymysql://{db_user}:{db_pwd}@{db_host}:{db_port}/{db_name}'
    # connect to database
    engine = db.create_engine(connection_str)
    connection = engine.connect()
    # pull metadata of a table
    metadata = db.MetaData(bind=engine)
    metadata.reflect(only=[table_name])
    content_table = metadata.tables[table_name]

    ############ Load CSV files as dataframe ############

    #edit me
    name_of_content_csv = "massEntry/test4.csv"
    name_of_relation_csv = "massEntry/testRelation.csv"

    contentDF = pd.read_csv (name_of_content_csv)
    relationDF = pd.read_csv (name_of_relation_csv)
    #print(contentDF)

    #validate the dataframes
    checkContentColumns(contentDF)
    checkRelationColumns(relationDF)
    checkRelationValidity(contentDF, relationDF)

    ############ Begin generating database lines based on content CSV file ############

    #Find the largest ID in the current database so adding new IDs will not create conflicts
    largestID = 0
    connection = engine.connect()
    stmt = select(content_table).order_by(content_table.c.id)
    print(stmt)
    with connection as conn:
        result = conn.execute(stmt)
        print(result)

    print(largestID)

    #for index, row in contentDF.iterrows():
    #    connection = engine.connect()
    #    contents = {}
    #    stmt = insert(content_table).values(id=(row['id']+largestID), type=row['type'], name=row['name'], content=contents)
    #    compiled = stmt.compile()
    #
    #    with connection as conn:
    #        result = conn.execute(stmt)

    # specify connection string
    #connection_str = f'mysql+pymysql://{db_user}:{db_pwd}@{db_host}:{db_port}/{db_name}'
    # connect to database
    #engine2 = db.create_engine(connection_str)
    #connection = engine2.connect()
    # pull metadata of a table
    #metadata = db.MetaData(relation_name)
    #metadata.reflect(only=[relation_name])
    #relation_table = metadata.tables[relation_name]

    #for index, row in relationDF.iterrows():
    #    connection = engine2.connect()
    #    contents = {}
    #    stmt = insert(content_table).values(id=(row['id']+largestID), type=row['type'], 
    #    subtype=row['subtype'], link_from=row['link_from'], link_to=row['link_to'],
    #    year_start=row['year_start'], year_end=['year_end'], content=contents
    #    )
    #    compiled = stmt.compile()
    #
    #   with connection as conn:
    #       result = conn.execute(stmt)


    ############ As test, print the tables ############

    #connection = engine.connect()
    #stmt = select(content_table)
    #print(stmt)
    #with connection as conn:
    #    result = conn.execute(stmt)
    #    for row in result:
    #        print(row)

    #connection = engine.connect()
    #stmt = select(relation_table)
    #print(stmt)
    #with connection as conn:
    #    result = conn.execute(stmt)
    #    for row in result:
    #        print(row)

if __name__ == "__main__":
    main()