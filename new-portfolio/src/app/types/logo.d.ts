export interface LogoProps {
    strokePrimary?: string;
    strokeSecondary?: string;
    strokeThird?:string;
    colorPrimary?: string;   // cor da chave esquerda {
    colorSecondary?: string;
    colorThird?: string; // cor da chave direita }
    className?: string;      // caso queira aplicar classe extra
    style?: React.CSSProperties; // para injetar variáveis CSS dinamicamente
}