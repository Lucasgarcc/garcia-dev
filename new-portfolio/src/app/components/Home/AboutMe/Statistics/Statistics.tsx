'use client';
import '../../../../globals.css';
import Styles from './Statistics.module.css';   
import react from 'react';

const Statistics = () => {
    return (
        <div className={Styles.ContainerStatistics}>
            <div className={Styles.StatisticBox}>
                <span className="text-3xl font-bold var(--color-text)">6+</span>
                <span className="text-sm text-white">Projetos</span>
            </div>
            <div className={Styles.StatisticBox}>
                <span className="text-3xl font-bold var(--color-text)">2+</span>
                <span className="text-sm text-white">Anos de Experiência</span>
            </div>
            <div className={Styles.StatisticBox}>
                <span className="text-3xl font-bold var(--color-text)">+3</span>
                <span className="text-sm text-white">Clientes Satisfeitos</span>
            </div>
        </div>
    )
}

export default Statistics;