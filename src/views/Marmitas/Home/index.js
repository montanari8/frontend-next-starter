﻿import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { Layout } from 'layout';

import { Card, SectionButton } from '../components';
import styles from './Marmitas.module.scss';

const mockedOrder = [
  {
    id: '001',
    plate: [
      {
        name: 'Bife acebolado (G)',
        price: 56.2,
        amount: 2,
      },
      {
        name: 'Bife acebolado (P)',
        price: 16.5,
        amount: 1,
      },
    ],
    total: 72.7,
    status: 'delivering',
  },
  {
    id: '002',
    plate: [
      {
        name: 'Bife acebolado (G)',
        price: 25,
        amount: 1,
      },
      {
        name: 'Bife acebolado (M)',
        price: 20,
        amount: 1,
      },
      {
        name: 'Bife acebolado (P)',
        price: 15,
        amount: 1,
      },
    ],
    total: 60,
    status: 'delivering',
  },
  {
    id: '003',
    plate: [
      {
        name: 'Bife acebolado (G)',
        price: 25,
        amount: 1,
      },
    ],
    total: 25,
    status: 'delivering',
  },
  {
    id: '004',
    plate: [
      {
        name: 'Bife acebolado (G)',
        price: 25,
        amount: 1,
      },
      {
        name: 'Bife acebolado (M)',
        price: 20,
        amount: 1,
      },
      {
        name: 'Bife acebolado (P)',
        price: 15,
        amount: 1,
      },
    ],
    total: 60,
    status: 'delivering',
  },
];

export default function MarmitaView() {
  return (
    <Layout session="Marmitas">
      <Container className="py-5">
        <div className={styles.sectionWrapper}>
          <SectionButton>Nova Venda</SectionButton>
          <Link href="/marmitas/produto" passHref>
            <SectionButton color="yellow" asChild>
              <a>Produtos</a>
            </SectionButton>
          </Link>
          <SectionButton color="light-blue">Pedidos</SectionButton>
          <SectionButton color="gray">Faturamento</SectionButton>
        </div>
        <div className={styles.wrapper}>
          {mockedOrder.map((order) => (
            <Card key={order.id} order={order.id} {...order} />
          ))}
        </div>
      </Container>
    </Layout>
  );
}
