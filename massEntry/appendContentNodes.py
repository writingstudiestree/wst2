from tkinter import NS
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

def mergeNSI(contentDF):
    NSIdf = pd.read_csv("massEntry/non-school-institutions--20220721--from-taxonomy-to-nodes.csv")
    NSIdf['name'] = NSIdf['label_combined'].fillna(NSIdf['name'])
    NSIdf['description'] = NSIdf['description'].fillna("")
    typeArr = []
    for index, row in NSIdf.iterrows():
        typeArr.append('institution')
    NSIdf = NSIdf.filter(['name', 'description'])
    NSIdf['Address'] = typeArr

    existingList = []
    for index, row in NSIdf.iterrows():
        existingList.append(row['name'].split("|"))
    print(existingList)

def checkContentColumns(contentDF):
    if 'id' not in contentDF.columns:
        raise Exception("id is a required column in the content table")
    if 'type' not in contentDF.columns:
        raise Exception("type is a required column in the content table")
    if 'name' not in contentDF.columns:
        raise Exception("name is a required column in the content table")

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
    contentDF = pd.read_csv (name_of_content_csv)

    #Append NSI's and check contentDF for duplicates
    mergeNSI(contentDF)


    raise Exception("you are too cool")
    #validate the dataframe
    checkContentColumns(contentDF)

    ############ Begin generating database lines based on content CSV file ############

    #Find the largest ID in the current database so adding new IDs will not create conflicts
    largestID = 600
    print(largestID)

    for index, row in contentDF.iterrows():
        connection = engine.connect()
        contents = {}
        stmt = insert(content_table).values(type=row['type'], name=row['name'], content=contents)
        compiled = stmt.compile()
    
        with connection as conn:
            result = conn.execute(stmt)

    ############ As test, print the table ############

    connection = engine.connect()
    stmt = select(content_table)
    print(stmt)
    with connection as conn:
        result = conn.execute(stmt)
        for row in result:
            print(row)

    # Now, execute appendRelationNodes.py

if __name__ == "__main__":
    main()