'use client';
import Styles from './Statistics.module.css';
import React from 'react';
import { StatisticsProps } from '@/core/interfaces/statistics';

const Statistics = ({ label, quantity }: StatisticsProps) => {
    return (
        <div className={Styles.ContainerStatistics}>
            <div className={Styles.StatisticBox}>
                <span className="text-3xl font-bold var(--color-text-p)">{quantity}+</span>
                <span className="text-sm text-white">{label}</span>
            </div>
        </div>
    )
}

export default Statistics;