/* I only ever used this in SequelPro, but I'm sure it could go elsewhere.
 * Note that the table name is used in line 18, and should be updated.
 * Likewise the prefix in line 16 and 18.
 */

delimiter //
CREATE  PROCEDURE `ChangeTableNameProcedure`()
BEGIN

    DECLARE int_val INT DEFAULT 0;
    DECLARE my_outer_cursor_done INT DEFAULT FALSE;
    DECLARE my_oldTable VARCHAR(100);
    DECLARE my_newTable VARCHAR(100);

    DECLARE tableNameCursor CURSOR FOR SELECT TABLE_NAME oldName,
    CONCAT(SUBSTRING(TABLE_NAME,POSITION('drup_' IN TABLE_NAME) + 5)) newName
    FROM information_schema.tables
    WHERE TABLE_SCHEMA = 'wst_minimal_20170310' AND TABLE_NAME LIKE 'drup_%';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET my_outer_cursor_done = TRUE;



OPEN tableNameCursor;
    OUTER_CURSOR_LOOP: LOOP
            FETCH FROM tableNameCursor INTO my_oldTable,my_newTable;

                    IF my_outer_cursor_done THEN
                        CLOSE tableNameCursor;
                        LEAVE OUTER_CURSOR_LOOP;
                    END IF;
                    SET @old = my_oldTable;
                    SET @new = my_newTable;
                    SET @statement = CONCAT('RENAME TABLE ',@old,' TO ',@new);

                    PREPARE stmt FROM @statement;
                    EXECUTE stmt;
                    DEALLOCATE PREPARE stmt;


                    END LOOP OUTER_CURSOR_LOOP;


    END//

Call ChangeTableNameProcedure();
