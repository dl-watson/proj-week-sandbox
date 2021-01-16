INSERT INTO users (username, password_hash)
VALUES  ('dee', 'password'),
        ('sarah', 'password'),
        ('kt', 'password'),
        ('richard', 'password');


INSERT INTO rooms (name, description, north, east, south, west)
VALUES  ('entrance-hall', 'the entrance hall', 'room-1', 'null', 'null', 'null'),
        ('room-1', 'the first room', 'room-4', 'room-3', 'entrance-hall', 'room-2'),
        ('room-2', 'the second room', 'null', 'null', 'null', 'room-1'),
        ('room-3', 'the third room', 'null', 'room-1', 'null', 'null'),
        ('room-4', 'the fourth room', 'null', 'room-1', 'null', 'null');


INSERT INTO items (name, description, actions, room_id)
VALUES  ('key', 'a key', ARRAY['hold', 'use'], 1),
        ('key', 'a key', ARRAY['hold', 'use'], 2),
        ('key', 'a key', ARRAY['hold', 'use'], 3),
        ('key', 'a key', ARRAY['hold', 'use'], 4),
        ('torch', 'a torch', ARRAY['hold', 'light'], 1),
        ('torch', 'a torch', ARRAY['hold', 'light'], 2),
        ('torch', 'a torch', ARRAY['hold', 'light'], 3),
        ('torch', 'a torch', ARRAY['hold', 'light'], 4),
        ('dagger', 'a dagger', ARRAY['equip', 'stab'], 1),
        ('dagger', 'a dagger', ARRAY['equip', 'stab'], 2),
        ('dagger', 'a dagger', ARRAY['equip', 'stab'], 3),
        ('dagger', 'a dagger', ARRAY['equip', 'stab'], 4);


INSERT INTO game_instances (game_completed)
VALUES (false);

INSERT INTO game_users (game_id, game_user_id, socket_uuid, current_location, hp, base_atk, inventory)
VALUES  (1, 1, 1, 'entrance-hall', 20, 3, '{}'),
        (1, 1, 2, 'entrance-hall', 20, 3, '{}'),
        (1, 1, 3, 'entrance-hall', 20, 3, '{}'),
        (1, 1, 4, 'entrance-hall', 20, 3, '{}');

INSERT INTO game_items (item_id, game_id, room_id)
VALUES  (1, 1, 1),
        (2, 1, 1),
        (3, 1, 1),
        (4, 1, 1),
        (5, 1, 2),
        (6, 1, 2),
        (7, 1, 2),
        (8, 1, 2),
        (9, 1, 2),
        (10, 1, 2),
        (11, 1, 2),
        (12, 1, 2);

INSERT INTO game_npcs (npc_id, game_id, room_id, dialogue_exhausted, alive_or_dead)
VALUES  (1, 1, 1, false, true),
        (2, 1, 2, false, true),
        (3, 1, 3, false, true),
        (4, 1, 4, false, true);
