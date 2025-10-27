export type LogoCSSVars = {
  '--logo-fill-primary'?: string;
  '--logo-stroke-primary'?: string;
  '--logo-stroke-secondary'?: string;
  '--logo-gradient-stop1'?: string;
  '--logo-gradient-stop2'?: string;
  '--logo-gradient-stop3'?: string;
};

export interface LogoProps {
  className?: string;
  style?: React.CSSProperties & LogoCSSVars;
}
