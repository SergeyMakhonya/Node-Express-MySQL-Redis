CREATE TABLE user (
	user_id int auto_increment NOT NULL,
	created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at datetime NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


CREATE TABLE note (
	note_id int auto_increment NOT NULL,
	user_id int NOT NULL,
	text varchar(1000) NOT NULL,
    shared tinyint(1) NOT NULL DEFAULT 0,
	created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at datetime NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (note_id),
	KEY user_id (user_id),
	CONSTRAINT note__user_id_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


CREATE TABLE shared_item (
	shared_item_id int auto_increment NOT NULL,
	item_type enum('note') NOT NULL,
	item_id int NOT NULL,
	created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at datetime NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (shared_item_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
