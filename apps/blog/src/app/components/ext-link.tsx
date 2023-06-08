import { JSX, ClassAttributes, AnchorHTMLAttributes } from "react"

const ExtLink = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} rel="noopener" target={props.target || '_blank'} />
)
export default ExtLink