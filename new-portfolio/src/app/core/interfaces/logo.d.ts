export interface LogoProps {
    strokePrimary?: string;
    strokeSecondary?: string;
    strokeThird?:string;
    colorPrimary?: string;   // cor da chave esquerda {
    colorSecondary?: string;
    className?: string;      // caso queira aplicar classe extra
    style?: React.CSSProperties; // para injetar variáveis CSS dinamicamente
}
