--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: user_roles; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_roles AS ENUM (
    'customer',
    'admin',
    'host'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Reviews" (
    "Id" integer NOT NULL,
    "userID" integer,
    "Name" "char",
    "Review" "char",
    "Rating" integer,
    "Created" date
);


--
-- Name: accommodations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accommodations (
    id integer NOT NULL,
    host_id integer,
    title character varying(255),
    description text,
    price_per_night numeric,
    location character varying(255),
    city character varying(100),
    country character varying(100),
    latitude numeric,
    longitude numeric,
    bedrooms integer,
    bathrooms integer,
    max_guests integer,
    amenities text,
    check_in_time time without time zone,
    check_out_time time without time zone,
    image_urls text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50),
    is_available boolean DEFAULT true
);


--
-- Name: accommodations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.accommodations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: accommodations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.accommodations_id_seq OWNED BY public.accommodations.id;


--
-- Name: availability; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.availability (
    id integer NOT NULL,
    accommodation_id integer,
    start_date date,
    end_date date,
    is_available boolean DEFAULT true
);


--
-- Name: availability_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.availability_id_seq OWNED BY public.availability.id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    accommodation_id integer,
    user_id integer,
    start_date date,
    end_date date,
    num_guests integer,
    total_price numeric,
    status character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    reservation_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_method character varying(50) NOT NULL,
    transaction_id character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: picnic_availability; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.picnic_availability (
    id integer NOT NULL,
    picnic_id integer,
    available_date date NOT NULL,
    is_available boolean DEFAULT true
);


--
-- Name: picnic_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.picnic_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: picnic_availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.picnic_availability_id_seq OWNED BY public.picnic_availability.id;


--
-- Name: picnics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.picnics (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    location character varying(255) NOT NULL,
    duration integer NOT NULL,
    image character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(255)
);


--
-- Name: picnics_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.picnics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: picnics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.picnics_id_seq OWNED BY public.picnics.id;


--
-- Name: reservation_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reservation_items (
    id integer NOT NULL,
    reservation_id integer NOT NULL,
    description text NOT NULL,
    cost numeric(10,2) NOT NULL,
    quantity integer DEFAULT 1 NOT NULL
);


--
-- Name: reservation_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reservation_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reservation_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reservation_items_id_seq OWNED BY public.reservation_items.id;


--
-- Name: reservations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    user_id integer NOT NULL,
    unique_invoice_id character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    total_cost numeric(10,2) NOT NULL,
    amount_paid numeric(10,2) DEFAULT 0.00 NOT NULL,
    check_in_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: trips; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trips (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    location character varying(255) NOT NULL,
    image character varying(255),
    price numeric(10,2) NOT NULL,
    dates character varying(255),
    max_guests integer NOT NULL,
    duration character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    status character varying(255)
);


--
-- Name: trips_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.trips_id_seq OWNED BY public.trips.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email public.citext NOT NULL,
    password_hash character varying(255),
    phone character varying(20),
    profile_picture text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    role public.user_roles DEFAULT 'customer'::public.user_roles NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: accommodations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accommodations ALTER COLUMN id SET DEFAULT nextval('public.accommodations_id_seq'::regclass);


--
-- Name: availability id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.availability ALTER COLUMN id SET DEFAULT nextval('public.availability_id_seq'::regclass);


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: picnic_availability id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.picnic_availability ALTER COLUMN id SET DEFAULT nextval('public.picnic_availability_id_seq'::regclass);


--
-- Name: picnics id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.picnics ALTER COLUMN id SET DEFAULT nextval('public.picnics_id_seq'::regclass);


--
-- Name: reservation_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservation_items ALTER COLUMN id SET DEFAULT nextval('public.reservation_items_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Name: trips id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trips ALTER COLUMN id SET DEFAULT nextval('public.trips_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Reviews" ("Id", "userID", "Name", "Review", "Rating", "Created") FROM stdin;
\.


--
-- Data for Name: accommodations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accommodations (id, host_id, title, description, price_per_night, location, city, country, latitude, longitude, bedrooms, bathrooms, max_guests, amenities, check_in_time, check_out_time, image_urls, created_at, updated_at, status, is_available) FROM stdin;
3	1	Villa Simulizi 	A brand new ultra modern villa set to deliver an extravagant, opulent stay.	18000	Diani, Kwale county 	Diani	Kenya	0	0	2	2	4	WiFi, Pool, Smart TV	11:02:00	10:22:00	images/villa_simulizi_1.jpeg, images/villa_simulizi_2.jpeg, images/villa_simulizi_3.jpeg	2024-12-11 18:22:31.654816	2024-12-11 18:22:31.654816	available	t
5	1	Saudi villa	A Saudi inspired villa	10000	Diani, Kwale county	Diani	Kenya	0	0	2	2	4	WiFi, Smart TV, Pool	10:00:00	11:32:00	images/saudi_villa1.jpeg, images/saudi_villa2.jpeg, images/saudi_villa3.jpeg	2024-12-11 18:32:36.46774	2024-12-11 18:32:36.46774	available	t
6	1	Villa Bahari	Villa Bahari, meaning "ocean villa" in Swahili, is a luxurious beachfront property offering stunning ocean views, a private pool, and modern Swahili-style architecture. The villa features spacious interiors, intricate wooden carvings, and lush tropical gardens. Ideal for families or groups looking to experience coastal luxury and tranquility.	25000	Beachfront, Diani	Diani	Kenya	-4.2857	39.5412	4	3	8	WiFi, Air Conditioning, Pool, Free Parking, BBQ Grill	14:00:00	10:00:00	images/villa_bahari1.jpg, images/villa_bahari2.jpg, images/villa_bahari3.jpg	2024-12-22 18:42:22.922278	2024-12-22 18:42:22.922278	available	t
12	1	Raha Retreat	Raha Retreat, meaning "relaxation retreat," is a tranquil getaway located on the pristine beaches of Diani. The property features spacious suites, a private patio, and hammocks overlooking the ocean. Experience the ultimate relaxation with warm Swahili hospitality.	18000	Beachfront, Diani	Diani	Kenya	-4.2921	39.5613	3	3	6	WiFi, Air Conditioning, Pool, Free Parking, Spa Access	14:00:00	11:00:00	images/raha_retreat1.jpg, images/raha_retreat2.jpg, images/raha_retreat3.jpg	2024-12-22 18:46:49.152442	2024-12-22 18:46:49.152442	available	t
11	1	Pwani Cottage	Pwani Cottage, or "coastal cottage," is nestled in a lush green setting near the beach. This rustic retreat offers an authentic Swahili coastal vibe, with charming wooden interiors, handcrafted decor, and easy access to nature trails. Perfect for couples or solo travelers seeking peace and relaxation.	12000	Coastal Forest, Ukunda	Ukunda	Kenya	-4.3011	39.5400	2	2	5	WiFi, Kitchen, Free Parking, Garden View	13:00:00	11:00:00	images/pwani_cottage1.jpg, images/pwani_cottage2.jpg, images/pwani_cottage3.jpg	2024-12-22 18:46:07.864728	2024-12-22 18:46:07.864728	available	t
7	2	Nyumba ya Mji	Nyumba ya Mji, or "house in town," is a cozy apartment situated in the heart of Kwale town. This Swahili-inspired space blends modern convenience with traditional charm, offering proximity to local markets, restaurants, and attractions. Perfect for couples or business travelers seeking a comfortable and cultural experience.	8000	Town Center, Kwale	Kwale	Kenya	-4.1748	39.4522	2	1	4	WiFi, Kitchen, Workspace, Free Parking	12:00:00	11:00:00	images/nyumba_mji1.jpg, images/nyumba_mji2.jpg, images/nyumba_mji3.jpg	2024-12-22 18:42:27.052218	2024-12-22 18:42:27.052218	available	t
4	1	Baxton Point	A Swahili-inspired villa 	20000	Diani, Kwale county 	Diani	Kenya	0	0	3	3	6	WiFi, Pool, Smart TV	11:00:00	10:00:00	images/halima_villa1.jpeg, images/halima_villa2.jpeg, images/halima_villa3.jpeg	2024-12-11 18:28:52.651306	2024-12-11 18:28:52.651306	available	t
13	1	APA apartments Nyali	Zawadi Beach House, or "gift beach house," offers an intimate and luxurious beachfront experience. With its modern Swahili-inspired design, spacious rooms, and direct beach access, this house is ideal for families or groups looking to enjoy the beauty of the Kenyan coast.	20000	Beachfront, Tiwi	Tiwi	Kenya	-4.2456	39.5767	4	4	10	WiFi, Kitchen, Free Parking, Beachfront Access	13:00:00	10:00:00	images/zawadi_house1.jpg, images/zawadi_house2.jpg, images/zawadi_house3.jpg	2024-12-22 18:47:28.572771	2024-12-22 18:47:28.572771	available	t
\.


--
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.availability (id, accommodation_id, start_date, end_date, is_available) FROM stdin;
3	5	2024-12-13	2025-12-12	t
4	4	2024-12-13	2024-12-20	t
5	4	2024-12-21	2025-01-02	f
6	4	2025-01-03	2025-12-31	t
7	6	2024-12-01	2024-12-10	t
8	6	2024-12-11	2024-12-15	f
9	6	2024-12-16	2024-12-31	t
10	6	2025-01-01	2025-01-05	f
11	6	2025-01-06	2025-01-15	t
12	7	2024-12-01	2024-12-07	t
13	7	2024-12-08	2024-12-14	f
14	7	2024-12-15	2024-12-20	t
15	7	2024-12-21	2024-12-27	f
16	7	2024-12-28	2025-01-05	t
27	11	2024-12-01	2024-12-09	t
28	11	2024-12-10	2024-12-18	f
29	11	2024-12-19	2024-12-30	t
30	11	2024-12-31	2025-01-03	f
31	11	2025-01-04	2025-01-15	t
32	12	2024-12-01	2024-12-09	t
33	12	2024-12-10	2024-12-18	f
34	12	2024-12-19	2024-12-30	t
35	12	2024-12-31	2025-01-03	f
36	12	2025-01-04	2025-01-15	t
37	13	2024-12-01	2024-12-05	t
38	13	2024-12-06	2024-12-10	f
39	13	2024-12-11	2024-12-20	t
40	13	2024-12-21	2024-12-31	f
41	13	2025-01-01	2025-01-10	t
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.bookings (id, accommodation_id, user_id, start_date, end_date, num_guests, total_price, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (id, reservation_id, amount, payment_method, transaction_id, created_at) FROM stdin;
\.


--
-- Data for Name: picnic_availability; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.picnic_availability (id, picnic_id, available_date, is_available) FROM stdin;
1	1	2024-12-25	t
2	1	2024-12-26	t
3	1	2024-12-27	f
4	2	2024-12-25	t
5	2	2024-12-26	f
6	2	2024-12-27	t
7	2	2024-12-28	t
8	3	2024-12-25	t
9	3	2024-12-26	t
10	3	2024-12-27	t
11	3	2024-12-28	f
\.


--
-- Data for Name: picnics; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.picnics (id, title, description, price, location, duration, image, created_at, updated_at, status) FROM stdin;
1	Beach Picnic at Diani	Enjoy a relaxing picnic by the white sandy beaches of Diani with your loved ones.	3500.00	Diani Beach	4	images/beach_picnic.jpeg	2024-12-18 11:58:36.471959	2024-12-18 11:58:36.471959	\N
2	Nature Walk at Kaya Kinondo	Explore the sacred Kaya Kinondo forest and learn about its cultural significance.	4500.00	Kaya Kinondo, Kwale	3	images/kaya_kinondo.jpeg	2024-12-18 11:58:36.471959	2024-12-18 11:58:36.471959	\N
3	Mangrove Canoe Adventure	Paddle through the serene mangrove forests in Funzi Island.	5000.00	Funzi Island	5	images/mangrove_canoe.jpeg	2024-12-18 11:58:36.471959	2024-12-18 11:58:36.471959	\N
4	Sunset Picnic at Kongo River	Experience a serene sunset picnic by the Kongo River with a blend of nature and tranquility.	4000.00	Kongo River, Kwale County	3	images/kongo_river_picnic.jpeg	2024-12-18 11:58:59.666605	2024-12-18 11:58:59.666605	\N
5	Family Picnic at Shimba Hills	Enjoy a fun-filled family picnic amidst the breathtaking landscapes of Shimba Hills National Reserve.	5500.00	Shimba Hills National Reserve	6	images/shimba_hills_picnic.jpeg	2024-12-18 11:58:59.666605	2024-12-18 11:58:59.666605	\N
\.


--
-- Data for Name: reservation_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reservation_items (id, reservation_id, description, cost, quantity) FROM stdin;
1	2	Room 101	5000.00	2
2	2	Room 202	4000.00	1
3	3	Room 303	6000.00	3
4	3	Room 404	4500.00	2
5	4	Halima villa	20000.00	5
6	4	Dhow Cruise and Snorkeling	15000.00	1
7	4	Family Picnic at Shimba Hills	5500.00	1
8	4	Chef	12000.00	1
9	4	Transfer	8800.00	1
10	4	Guide	3000.00	1
11	5	Halima villa	20000.00	5
12	5	Dhow Cruise and Snorkeling	15000.00	1
13	5	Family Picnic at Shimba Hills	5500.00	1
14	5	Chef	12000.00	1
15	5	Transfer	8800.00	1
16	5	Guide	3000.00	1
17	6	Halima villa	20000.00	4
18	6	Cultural Heritage Tour	20000.00	1
19	6	Mangrove Canoe Adventure	5000.00	1
20	6	Chef	12000.00	1
21	6	Transfer	13200.00	1
22	6	Guide	1500.00	1
23	7	Zawadi Beach House	20000.00	3
24	7	Saudi villa	10000.00	4
25	7	Dhow Cruise and Snorkeling	15000.00	1
26	7	Mangrove Canoe Adventure	5000.00	1
27	7	Chef	12000.00	1
28	7	Transfer	13200.00	1
29	7	Guide	3000.00	1
30	7	Guide	1500.00	1
31	8	Nyumba ya Mji	8000.00	4
32	8	Beach Picnic at Diani	3500.00	1
33	8	Chef	12000.00	1
34	8	Transfer	17600.00	1
35	8	Guide	3000.00	1
36	8	Guide	3000.00	1
37	9	Pwani Cottage	12000.00	3
38	9	Guide	3000.00	1
39	10	Beach Picnic at Diani	3500.00	1
40	10	Nature Walk at Kaya Kinondo	4500.00	1
41	10	Sunset Picnic at Kongo River	4000.00	1
42	11	Nyumba ya Mji	8000.00	3
43	12	Transfer	13200.00	1
44	13	Halima villa	20000.00	3
45	14	Halima villa	20000.00	4
46	14	Villa Simulizi 	18000.00	3
47	14	Cultural Heritage Tour	20000.00	1
48	14	Dhow Cruise and Snorkeling	15000.00	1
49	14	Beach Picnic at Diani	3500.00	1
50	14	Mangrove Canoe Adventure	5000.00	1
51	14	Chef	9000.00	1
52	14	Transfer	17600.00	1
53	14	Transfer	17600.00	1
54	14	Guide	1500.00	1
55	14	Guide	3000.00	1
56	15	Halima villa	20000.00	3
57	15	Cultural Heritage Tour	20000.00	1
58	15	Nature Walk at Kaya Kinondo	4500.00	1
59	15	Safari Adventure	50000.00	1
60	15	Family Picnic at Shimba Hills	5500.00	1
61	15	Chef	12000.00	1
62	15	Chef	4500.00	1
63	15	Transfer	8800.00	1
64	15	Transfer	8800.00	1
65	15	Guide	1500.00	1
66	15	Guide	3000.00	1
67	16	Nyumba ya Mji	8000.00	2
68	16	Dhow Cruise and Snorkeling	15000.00	1
69	16	Sunset Picnic at Kongo River	4000.00	1
70	16	Chef	12000.00	1
71	16	Transfer	8800.00	1
72	16	Guide	1500.00	1
100	49	Halima villa	20000.00	4
101	49	Cultural Heritage Tour	20000.00	1
102	49	Mangrove Canoe Adventure	5000.00	1
103	49	Chef	12000.00	1
104	49	Transfer	17600.00	1
105	49	Guide	3000.00	1
106	50	Pwani Cottage	12000.00	3
107	51	Chef	6000.00	1
108	51	Transfer	13200.00	1
109	51	Guide	3000.00	1
110	51	Halima villa	20000.00	4
111	52	Zawadi Beach House	20000.00	4
112	52	Dhow Cruise and Snorkeling	15000.00	1
113	52	Sunset Picnic at Kongo River	4000.00	1
114	52	Chef	12000.00	1
115	52	Transfer	8800.00	1
116	52	Guide	3000.00	1
117	53	Zawadi Beach House	20000.00	4
118	53	Cultural Heritage Tour	20000.00	1
119	53	Nature Walk at Kaya Kinondo	4500.00	1
120	53	Chef	12000.00	1
121	53	Transfer	8800.00	1
122	53	Guide	1500.00	1
123	54	Halima villa	20000.00	4
124	55	Halima villa	20000.00	4
125	55	Cultural Heritage Tour	20000.00	1
126	57	Halima villa	20000.00	6
127	58	Villa Simulizi 	18000.00	3
128	59	Halima villa	20000.00	3
129	60	Cultural Heritage Tour	20000.00	1
130	61	Chef	6000.00	1
131	61	Transfer	13200.00	1
132	61	Guide	1500.00	1
133	61	Halima villa	20000.00	4
134	62	Halima villa	20000.00	3
135	63	Transfer	8800.00	1
136	63	Nature Walk at Kaya Kinondo	4500.00	1
137	63	Halima villa	20000.00	4
\.


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reservations (id, user_id, unique_invoice_id, status, total_cost, amount_paid, check_in_date, created_at, updated_at) FROM stdin;
3	2	INV-1708761234567-6790	Pending	21000.00	0.00	\N	2024-12-23 15:45:53.61853	2024-12-23 15:45:53.61853
4	7	INV-1734958809558-28741	Pending	144300.00	0.00	\N	2024-12-23 16:00:15.000335	2024-12-23 16:00:15.000335
5	7	INV-1734958836847-56225	Pending	144300.00	0.00	\N	2024-12-23 16:00:38.504016	2024-12-23 16:00:38.504016
6	7	INV-1734970282587-10714	Pending	131700.00	0.00	\N	2024-12-23 19:11:28.978078	2024-12-23 19:11:28.978078
7	7	INV-1734971127934-15791	Pending	149700.00	0.00	\N	2024-12-23 19:25:31.524096	2024-12-23 19:25:31.524096
8	7	INV-1734971766876-16731	Pending	71100.00	0.00	\N	2024-12-23 19:36:19.31196	2024-12-23 19:36:19.31196
9	7	INV-1734984316500-84862	Pending	39000.00	0.00	\N	2024-12-23 23:06:19.843242	2024-12-23 23:06:19.843242
10	7	INV-1734984773152-21989	Pending	12000.00	0.00	\N	2024-12-23 23:13:01.839068	2024-12-23 23:13:01.839068
11	7	INV-1735019726582-33041	Pending	24000.00	0.00	\N	2024-12-24 08:55:33.079877	2024-12-24 08:55:33.079877
12	15	INV-1735026122765-89170	Pending	13200.00	0.00	\N	2024-12-24 10:42:12.273218	2024-12-24 10:42:12.273218
13	7	INV-1735037389955-18400	Pending	60000.00	0.00	\N	2024-12-24 13:49:56.727284	2024-12-24 13:49:56.727284
2	1	INV-1708761234567-6789	Pending	14000.00	0.00	\N	2024-12-23 15:44:51.449989	2024-12-23 15:44:51.449989
14	17	INV-1735060414825-66165	Pending	226200.00	0.00	\N	2024-12-24 20:13:39.284004	2024-12-24 20:13:39.284004
15	18	INV-1735061546599-65905	Pending	178600.00	0.00	\N	2024-12-24 20:32:41.898655	2024-12-24 20:32:41.898655
16	19	INV-1735068001712-35033	Pending	57300.00	0.00	\N	2024-12-24 22:20:04.84219	2024-12-24 22:20:04.84219
49	52	INV-1735142385608-51576	Pending	137600.00	0.00	\N	2024-12-25 18:59:48.261565	2024-12-25 18:59:48.261565
50	53	INV-1735327649175-55323	Pending	36000.00	0.00	\N	2024-12-27 22:27:47.664817	2024-12-27 22:27:47.664817
51	54	INV-1735500412051-61455	Pending	102200.00	0.00	\N	2024-12-29 22:27:01.867239	2024-12-29 22:27:01.867239
52	55	INV-1735584602087-69929	Pending	122800.00	0.00	\N	2024-12-30 21:50:05.605697	2024-12-30 21:50:05.605697
53	56	INV-1736106152549-51195	Pending	126800.00	0.00	\N	2025-01-05 22:42:35.57323	2025-01-05 22:42:35.57323
54	57	INV-1736140604048-29071	Pending	80000.00	0.00	\N	2025-01-06 08:16:44.817265	2025-01-06 08:16:44.817265
55	58	INV-1736168046822-26800	Pending	100000.00	0.00	\N	2025-01-06 15:54:08.428874	2025-01-06 15:54:08.428874
57	7	INV-1736263267568-87885	Pending	120000.00	0.00	\N	2025-01-07 18:21:09.674786	2025-01-07 18:21:09.674786
58	7	INV-1736749053252-66772	Pending	54000.00	0.00	\N	2025-01-13 09:17:35.184369	2025-01-13 09:17:35.184369
59	58	INV-1736849122057-10202	Pending	60000.00	0.00	\N	2025-01-14 13:05:24.453892	2025-01-14 13:05:24.453892
60	63	INV-1736853650982-35652	Pending	20000.00	0.00	\N	2025-01-14 14:20:55.618381	2025-01-14 14:20:55.618381
61	64	INV-1736921372365-36130	Pending	100700.00	0.00	\N	2025-01-15 09:09:35.041364	2025-01-15 09:09:35.041364
62	58	INV-1738583659913-60412	Pending	60000.00	0.00	\N	2025-02-03 14:54:22.33646	2025-02-03 14:54:22.33646
63	66	INV-1739205395389-55846	Pending	93300.00	0.00	\N	2025-02-10 19:36:44.981109	2025-02-10 19:36:44.981109
\.


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.trips (id, title, description, location, image, price, dates, max_guests, duration, created_at, updated_at, status) FROM stdin;
1	Safari Adventure	Experience the wild in this guided safari adventure through Tsavo National Park. See the Big Five and enjoy luxury camping.	Tsavo National Park, Kenya	images/safari_adventure.jpeg	50000.00	2024-12-20 to 2024-12-25	20	5 Days, 4 Nights	2024-12-18 08:47:39.648914	2024-12-18 08:47:39.648914	\N
2	Dhow Cruise and Snorkeling	Sail in a traditional dhow, enjoy snorkeling in crystal-clear waters, and indulge in fresh seafood.	Wasini Island, Kenya	images/dhow_cruise.jpeg	15000.00	2024-12-22	15	1 Day	2024-12-18 08:47:44.735356	2024-12-18 08:47:44.735356	\N
3	Cultural Heritage Tour	Explore the rich culture and heritage of the coastal region with visits to ancient ruins and traditional Swahili villages.	Mombasa, Kenya	images/cultural_heritage.jpeg	20000.00	2024-12-28 to 2024-12-30	10	3 Days, 2 Nights	2024-12-18 08:47:49.778626	2024-12-18 08:47:49.778626	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password_hash, phone, profile_picture, created_at, updated_at, role) FROM stdin;
7	Shem Watuma	shemwat04@gmail.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0113919039	\N	2024-12-23 19:00:15.000335+03	2024-12-23 19:00:15.000335+03	admin
1	John Doe	john.doe@example.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	1234567890	\N	2024-12-06 00:59:33.43967+03	2024-12-06 00:59:33.43967+03	host
17	Ruth Wanjiku	rwanjiku@email.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0722533385	\N	2024-12-24 23:13:39.284004+03	2024-12-24 23:13:39.284004+03	customer
18	Hassan Mohammed	hmoha@email.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0722530861	\N	2024-12-24 23:32:41.898655+03	2024-12-24 23:32:41.898655+03	customer
19	Gerald Owiny	gowiny@email.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0712402403	\N	2024-12-25 01:20:04.84219+03	2024-12-25 01:20:04.84219+03	customer
52	Steven Mauko	smauko@email.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0725225336	\N	2024-12-25 21:59:48.261565+03	2024-12-25 21:59:48.261565+03	customer
53	Charles Omamo	comamo@yahoo.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0718456654	\N	2024-12-28 01:27:47.664817+03	2024-12-28 01:27:47.664817+03	customer
54	Derrick Wafula	dwaf@outlook.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0781444332	\N	2024-12-30 01:27:01.867239+03	2024-12-30 01:27:01.867239+03	customer
55	Rachel wangeci	rwangexi@gmail.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0718556332	\N	2024-12-31 00:50:05.605697+03	2024-12-31 00:50:05.605697+03	customer
56	Eliud Kipchoge	ekipchoge@gmail.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0725443225	\N	2025-01-06 01:42:35.57323+03	2025-01-06 01:42:35.57323+03	customer
57	Swaleh Oswayo	swaelee@outlook.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0789654123	\N	2025-01-06 11:16:44.817265+03	2025-01-06 11:16:44.817265+03	customer
2	Jane Smith	jane.smith@example.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0987654321	\N	2024-12-06 01:02:49.169978+03	2024-12-06 01:02:49.169978+03	customer
15	Rashid Abdallah	rabdallah@gmail.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky		\N	2024-12-24 13:42:12.273218+03	2024-12-24 13:42:12.273218+03	customer
63	Siasa osiengo	siasahpeter@gmail.com	\N	0712345654	\N	2025-01-14 14:20:55.618381+03	2025-01-14 14:20:55.618381+03	customer
64	Habiba Galdem	habiba@email.com	\N	0720334556	\N	2025-01-15 09:09:35.041364+03	2025-01-15 09:09:35.041364+03	customer
58	Zanny Mapesa	zanny@outlook.com	$2b$10$HJJdXczPq3b.zZoaCZFj3.yakeswOr6k6bFnv6OKj8UtWzfqXVnky	0113919039	\N	2025-01-06 18:54:08.428874+03	2025-01-06 18:54:08.428874+03	customer
66	Rapper	rapper@email.com	\N	0113919039	\N	2025-02-10 19:36:44.981109+03	2025-02-10 19:36:44.981109+03	customer
\.


--
-- Name: accommodations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.accommodations_id_seq', 13, true);


--
-- Name: availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.availability_id_seq', 41, true);


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.bookings_id_seq', 2, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: picnic_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.picnic_availability_id_seq', 11, true);


--
-- Name: picnics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.picnics_id_seq', 5, true);


--
-- Name: reservation_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reservation_items_id_seq', 137, true);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reservations_id_seq', 63, true);


--
-- Name: trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.trips_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 66, true);


--
-- Name: accommodations accommodations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accommodations
    ADD CONSTRAINT accommodations_pkey PRIMARY KEY (id);


--
-- Name: availability availability_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: payments payments_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_transaction_id_key UNIQUE (transaction_id);


--
-- Name: picnic_availability picnic_availability_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.picnic_availability
    ADD CONSTRAINT picnic_availability_pkey PRIMARY KEY (id);


--
-- Name: picnics picnics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.picnics
    ADD CONSTRAINT picnics_pkey PRIMARY KEY (id);


--
-- Name: reservation_items reservation_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservation_items
    ADD CONSTRAINT reservation_items_pkey PRIMARY KEY (id);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);


--
-- Name: reservations unique_invoice_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT unique_invoice_id_unique UNIQUE (unique_invoice_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_users_phone; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_phone ON public.users USING btree (phone);


--
-- Name: accommodations accommodations_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accommodations
    ADD CONSTRAINT accommodations_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.users(id);


--
-- Name: availability availability_accommodation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_accommodation_id_fkey FOREIGN KEY (accommodation_id) REFERENCES public.accommodations(id) ON DELETE CASCADE;


--
-- Name: bookings bookings_accommodation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_accommodation_id_fkey FOREIGN KEY (accommodation_id) REFERENCES public.accommodations(id) ON DELETE CASCADE;


--
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: payments fk_payment_reservation; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payment_reservation FOREIGN KEY (reservation_id) REFERENCES public.reservations(id) ON DELETE CASCADE;


--
-- Name: reservation_items fk_reservation; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservation_items
    ADD CONSTRAINT fk_reservation FOREIGN KEY (reservation_id) REFERENCES public.reservations(id) ON DELETE CASCADE;


--
-- Name: reservations fk_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: picnic_availability picnic_availability_picnic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.picnic_availability
    ADD CONSTRAINT picnic_availability_picnic_id_fkey FOREIGN KEY (picnic_id) REFERENCES public.picnics(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

