--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--
-- Creating order table

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    order_name text NOT NULL,
    customer_id text NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--Creating order_items table

CREATE TABLE public.order_items (
    order_items_id integer NOT NULL,
    order_id integer,
    price_per_unit numeric,
    quantity integer NOT NULL,
    product text NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_items_id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: deliveries; Type: TABLE; Schema: public; Owner: postgres
--Creating deliveries table

CREATE TABLE public.deliveries (
    deliveries_id integer NOT NULL,
    order_items_id integer,
    delivered_quantity integer NOT NULL
);


ALTER TABLE public.deliveries OWNER TO postgres;

--
-- Name: deliveries deliveries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT deliveries_pkey PRIMARY KEY (deliveries_id);


--
-- Name: deliveries deliveries_order_items_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT deliveries_order_items_id_fkey FOREIGN KEY (order_items_id) REFERENCES public.order_items(order_items_id);

