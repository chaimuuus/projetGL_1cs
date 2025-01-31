PGDMP  6    -                 }         	   dzartisan    17.2    17.2 8               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16496 	   dzartisan    DATABASE     �   CREATE DATABASE dzartisan WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE dzartisan;
                     postgres    false            �            1259    16615    artisan_specialite    TABLE     p   CREATE TABLE public.artisan_specialite (
    artisan_id integer NOT NULL,
    specialite_id integer NOT NULL
);
 &   DROP TABLE public.artisan_specialite;
       public         heap r       postgres    false            �            1259    16497    artisans    TABLE     �  CREATE TABLE public.artisans (
    artisan_id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    metier character varying(255),
    phone_number character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    disponibilite boolean DEFAULT true,
    image_file character varying(255),
    localisation character varying(255)
);
    DROP TABLE public.artisans;
       public         heap r       postgres    false            �            1259    16503    artisans_id_artizan_seq    SEQUENCE     �   CREATE SEQUENCE public.artisans_id_artizan_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.artisans_id_artizan_seq;
       public               postgres    false    217                       0    0    artisans_id_artizan_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.artisans_id_artizan_seq OWNED BY public.artisans.artisan_id;
          public               postgres    false    218            �            1259    16504    certificates    TABLE     >  CREATE TABLE public.certificates (
    certificat_id integer NOT NULL,
    title character varying(255) NOT NULL,
    artisan_id integer,
    institution character varying(255),
    description text,
    image_file text,
    obtaining_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.certificates;
       public         heap r       postgres    false            �            1259    16510    certificates_id_seq    SEQUENCE     �   CREATE SEQUENCE public.certificates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.certificates_id_seq;
       public               postgres    false    219                       0    0    certificates_id_seq    SEQUENCE OWNED BY     V   ALTER SEQUENCE public.certificates_id_seq OWNED BY public.certificates.certificat_id;
          public               postgres    false    220            �            1259    16644    projects    TABLE     �   CREATE TABLE public.projects (
    project_id integer NOT NULL,
    title character varying(255) NOT NULL,
    image_file character varying(255),
    description text,
    price numeric(10,2),
    artisan_id integer NOT NULL
);
    DROP TABLE public.projects;
       public         heap r       postgres    false            �            1259    16643    projects_project_id_seq    SEQUENCE     �   CREATE SEQUENCE public.projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.projects_project_id_seq;
       public               postgres    false    229            	           0    0    projects_project_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;
          public               postgres    false    228            �            1259    16525    sessions    TABLE     �  CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer,
    artisan_id integer,
    user_type character varying(20),
    session_token text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    expires_at timestamp without time zone,
    CONSTRAINT sessions_user_type_check CHECK (((user_type)::text = ANY (ARRAY[('user'::character varying)::text, ('artisan'::character varying)::text])))
);
    DROP TABLE public.sessions;
       public         heap r       postgres    false            �            1259    16532    sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public               postgres    false    221            
           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public               postgres    false    222            �            1259    16640    specialites_specialite_id_seq    SEQUENCE     �   CREATE SEQUENCE public.specialites_specialite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.specialites_specialite_id_seq;
       public               postgres    false            �            1259    16590    specialites    TABLE     �   CREATE TABLE public.specialites (
    specialite_id integer DEFAULT nextval('public.specialites_specialite_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.specialites;
       public         heap r       postgres    false    227            �            1259    16533    users    TABLE     8  CREATE TABLE public.users (
    id_user integer NOT NULL,
    user_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(255),
    image_file character varying(255),
    address character varying(255)
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16538    users_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_id_user_seq;
       public               postgres    false    223                       0    0    users_id_user_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;
          public               postgres    false    224            >           2604    16539    artisans artisan_id    DEFAULT     z   ALTER TABLE ONLY public.artisans ALTER COLUMN artisan_id SET DEFAULT nextval('public.artisans_id_artizan_seq'::regclass);
 B   ALTER TABLE public.artisans ALTER COLUMN artisan_id DROP DEFAULT;
       public               postgres    false    218    217            @           2604    16540    certificates certificat_id    DEFAULT     }   ALTER TABLE ONLY public.certificates ALTER COLUMN certificat_id SET DEFAULT nextval('public.certificates_id_seq'::regclass);
 I   ALTER TABLE public.certificates ALTER COLUMN certificat_id DROP DEFAULT;
       public               postgres    false    220    219            F           2604    16647    projects project_id    DEFAULT     z   ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);
 B   ALTER TABLE public.projects ALTER COLUMN project_id DROP DEFAULT;
       public               postgres    false    229    228    229            B           2604    16543    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221            D           2604    16544    users id_user    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN id_user DROP DEFAULT;
       public               postgres    false    224    223            �          0    16615    artisan_specialite 
   TABLE DATA           G   COPY public.artisan_specialite (artisan_id, specialite_id) FROM stdin;
    public               postgres    false    226   F       �          0    16497    artisans 
   TABLE DATA           �   COPY public.artisans (artisan_id, full_name, metier, phone_number, email, password, disponibilite, image_file, localisation) FROM stdin;
    public               postgres    false    217   EF       �          0    16504    certificates 
   TABLE DATA           �   COPY public.certificates (certificat_id, title, artisan_id, institution, description, image_file, obtaining_date, created_at) FROM stdin;
    public               postgres    false    219   bG                  0    16644    projects 
   TABLE DATA           a   COPY public.projects (project_id, title, image_file, description, price, artisan_id) FROM stdin;
    public               postgres    false    229   H       �          0    16525    sessions 
   TABLE DATA           m   COPY public.sessions (id, user_id, artisan_id, user_type, session_token, created_at, expires_at) FROM stdin;
    public               postgres    false    221   �H       �          0    16590    specialites 
   TABLE DATA           :   COPY public.specialites (specialite_id, name) FROM stdin;
    public               postgres    false    225   �J       �          0    16533    users 
   TABLE DATA           g   COPY public.users (id_user, user_name, email, password, phone_number, image_file, address) FROM stdin;
    public               postgres    false    223   �J                  0    0    artisans_id_artizan_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.artisans_id_artizan_seq', 5, true);
          public               postgres    false    218                       0    0    certificates_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.certificates_id_seq', 2, true);
          public               postgres    false    220                       0    0    projects_project_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.projects_project_id_seq', 3, true);
          public               postgres    false    228                       0    0    sessions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sessions_id_seq', 26, true);
          public               postgres    false    222                       0    0    specialites_specialite_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.specialites_specialite_id_seq', 8, true);
          public               postgres    false    227                       0    0    users_id_user_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_id_user_seq', 8, true);
          public               postgres    false    224            [           2606    16619 *   artisan_specialite artisan_specialite_pkey 
   CONSTRAINT        ALTER TABLE ONLY public.artisan_specialite
    ADD CONSTRAINT artisan_specialite_pkey PRIMARY KEY (artisan_id, specialite_id);
 T   ALTER TABLE ONLY public.artisan_specialite DROP CONSTRAINT artisan_specialite_pkey;
       public                 postgres    false    226    226            I           2606    16546    artisans artisans_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.artisans
    ADD CONSTRAINT artisans_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.artisans DROP CONSTRAINT artisans_email_key;
       public                 postgres    false    217            K           2606    16631 "   artisans artisans_phone_number_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.artisans
    ADD CONSTRAINT artisans_phone_number_key UNIQUE (phone_number);
 L   ALTER TABLE ONLY public.artisans DROP CONSTRAINT artisans_phone_number_key;
       public                 postgres    false    217            M           2606    16550    artisans artisans_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.artisans
    ADD CONSTRAINT artisans_pkey PRIMARY KEY (artisan_id);
 @   ALTER TABLE ONLY public.artisans DROP CONSTRAINT artisans_pkey;
       public                 postgres    false    217            O           2606    16552    certificates certificates_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (certificat_id);
 H   ALTER TABLE ONLY public.certificates DROP CONSTRAINT certificates_pkey;
       public                 postgres    false    219            ]           2606    16651    projects projects_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);
 @   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
       public                 postgres    false    229            Q           2606    16558    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public                 postgres    false    221            Y           2606    16594    specialites specialite_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.specialites
    ADD CONSTRAINT specialite_pkey PRIMARY KEY (specialite_id);
 E   ALTER TABLE ONLY public.specialites DROP CONSTRAINT specialite_pkey;
       public                 postgres    false    225            S           2606    16560    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    223            U           2606    16562    users users_phone_number_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);
 F   ALTER TABLE ONLY public.users DROP CONSTRAINT users_phone_number_key;
       public                 postgres    false    223            W           2606    16564    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    223            `           2606    16620 5   artisan_specialite artisan_specialite_artisan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.artisan_specialite
    ADD CONSTRAINT artisan_specialite_artisan_id_fkey FOREIGN KEY (artisan_id) REFERENCES public.artisans(artisan_id);
 _   ALTER TABLE ONLY public.artisan_specialite DROP CONSTRAINT artisan_specialite_artisan_id_fkey;
       public               postgres    false    226    4685    217            a           2606    16625 8   artisan_specialite artisan_specialite_specialite_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.artisan_specialite
    ADD CONSTRAINT artisan_specialite_specialite_id_fkey FOREIGN KEY (specialite_id) REFERENCES public.specialites(specialite_id);
 b   ALTER TABLE ONLY public.artisan_specialite DROP CONSTRAINT artisan_specialite_specialite_id_fkey;
       public               postgres    false    4697    226    225            b           2606    16652 !   projects projects_artisan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_artisan_id_fkey FOREIGN KEY (artisan_id) REFERENCES public.artisans(artisan_id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_artisan_id_fkey;
       public               postgres    false    4685    229    217            ^           2606    16580 !   sessions sessions_artisan_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_artisan_id_fkey FOREIGN KEY (artisan_id) REFERENCES public.artisans(artisan_id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_artisan_id_fkey;
       public               postgres    false    217    4685    221            _           2606    16585    sessions sessions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id_user);
 H   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_user_id_fkey;
       public               postgres    false    221    223    4695            �      x�3�4�2�4bc 6b3�=... (�      �     x�M��N�@�����5��
,��XNb�Lb�e���vE}z7&��ϗ�����6JT'�Pr�ZE�n�,�2�J.�nR��C��5�|�-���aÜ��*��3���8���l�6����r�v>��qD	� v�x�/�`R'���8Ą��@�:C��׉�1Or�� �=Ï�pe����LE�+� �.�U�]��d"���_� �$��G��KY������i��w���f�M���Я�p��x[�Lm�7�b:]|���]���y���oK      �   �   x�E�K�0��5=��H}�E��jS�b�ؒ��sx1Ǩ1�d����$Do�%�?|WS#����]�!n����FJ����#N�]ul��RR텼i��itBQ>� ,Ij�`�x����*��F�M|>�I	�2+!�5�SXԜf�s^��b�3�^��?h          �   x�=ͱ�0��}�R!]\��`��:�Ĕr�El�����\��/��ɇ��� ��� ���X� ���ϩ���`�8 7���͵���m?K�i]��5HI]���Ui�����J0&�/6^l�0�e��.C󗠤�_j�@Z      �   �  x�m�Mn�0����@���!z�lD�:@�޿*�i<Av�a}~��������~>�Hl�3�YBPz�Z�1����.#j&�>Zkc��h<Hޑ�I��/��l�M>{&r"�h;o�6��BA)�E�Ȁʠ.����Sy���}/��B��R=�����Y#ƃ�f���&��
�`I9kdׅ2�toBfR1q�~��y����!N3��'���A|���i#����I�2�E-��/j�K�%���GY�jЀ?�7���(8�����h�J.���*�t�&:Occ�G��^��ctCaVPh��a�5��|��/��l����/�8":Ho4�jҤ2��w-#u����K�ӗ�hݽW�"
&�����/���T�{�/�g�θ	v#8�G:�}��f*�!9Z���@��8s���Q�vS��=ڝ@��R;�1��	�#݅��q z��      �   c   x�3�tN,*H�+)��2��)�M��K�2�t�IM.)�LN�Q�/��2�H��+I�r�&��u�q�私��9}�R��@<��Ԝ+F��� ���      �   �   x����N�0���9�����22f��l&3���1&���c��b��W'�rrr>lJ6]=�唖�X��4�Oc��S7ޡh���5Z������U�۳�
�"�D�j�� ������`�+�h�&6*�%���BU���DKR}���E��q"�wa�����M�Fj���]�3??U��-Eg�F��B�V�^�O���&��Z�.�����l_T��>1���xi�z������PZR�i8� 2M��/�1     