'use client';
import '../../../../globals.css';
import Styles from './Statistics.module.css';   
import React from 'react';

const Statistics = () => {
    return (
        <div className={Styles.ContainerStatistics}>
            <div className={Styles.StatisticBox}>
                <span className="text-3xl font-bold var(--color-text-p)">6+</span>
                <span className="text-sm text-white">Projetos</span>
            </div>
            <div className={Styles.StatisticBox}>
                <span className="text-3xl font-bold var(--color-text-p)">2+</span>
                <span className="text-sm text-white">Anos de Experiência</span>
            </div>
            <div className={Styles.StatisticBox}>
                <span className="text-3xl font-bold var(--color-text-p)">+3</span>
                <span className="text-sm text-white">Clientes Satisfeitos</span>
            </div>
        </div>
    )
}

export default Statistics;