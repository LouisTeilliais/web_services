insert into sports (sport_id, name)
values 
  (1, 'Basketball'),
  (2, 'Padel'),
  (3, 'Football'),
  (4, 'Ski'),
  (5, 'Course à pied');


CREATE INDEX sessions_location_idx ON sessions USING GIST (
  ST_SetSRID(ST_MakePoint(longitude::double precision, latitude::double precision), 4326)
);


