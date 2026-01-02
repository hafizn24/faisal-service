service_users
| column_name   | data_type         | is_nullable | column_default |
| ------------- | ----------------- | ----------- | -------------- |
| su_id         | uuid              | NO          | auth.uid()     |
| su_is_approve | boolean           | YES         | null           |
| su_email      | character varying | NO          | null           |
| su_type       | character varying | YES         | null           |

service_package
| column_name    | data_type         | is_nullable | column_default                                 |
| -------------- | ----------------- | ----------- | ---------------------------------------------- |
| sp_id          | integer           | NO          | nextval('service_package_sp_id_seq'::regclass) |
| sp_price       | numeric           | NO          | null                                           |
| sp_name        | character varying | NO          | null                                           |
| sp_description | text              | YES         | null                                           |

service_order
| column_name       | data_type                   | is_nullable | column_default                               |
| ----------------- | --------------------------- | ----------- | -------------------------------------------- |
| so_id             | integer                     | NO          | nextval('service_order_so_id_seq'::regclass) |
| s_customer_id     | integer                     | NO          | null                                         |
| s_hostel_id       | integer                     | NO          | null                                         |
| s_package_id      | integer                     | NO          | null                                         |
| s_users_id        | uuid                        | NO          | null                                         |
| so_time_slot      | timestamp without time zone | NO          | null                                         |
| so_work_status    | character varying           | YES         | null                                         |
| so_payment_status | character varying           | YES         | null                                         |

service_hostel
| column_name | data_type         | is_nullable | column_default                                |
| ----------- | ----------------- | ----------- | --------------------------------------------- |
| sh_id       | integer           | NO          | nextval('service_hostel_sh_id_seq'::regclass) |
| sh_name     | character varying | NO          | null                                          |

service_customer
| column_name     | data_type         | is_nullable | column_default                                  |
| --------------- | ----------------- | ----------- | ----------------------------------------------- |
| sc_id           | integer           | NO          | nextval('service_customer_sc_id_seq'::regclass) |
| sc_name         | character varying | NO          | null                                            |
| sc_email        | character varying | NO          | null                                            |
| sc_phone        | character varying | YES         | null                                            |
| sc_number_plate | character varying | YES         | null                                            |
| sc_brand_model  | character varying | YES         | null                                            |