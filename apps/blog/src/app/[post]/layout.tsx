import React from "react";

export default async function CategoryLayout(props: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <main>{props.children}</main>
        </React.Fragment>
    )
}