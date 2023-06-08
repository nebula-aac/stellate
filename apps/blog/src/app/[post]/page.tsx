import React from "react"

export default async function Category({
    params,
}: {
    params: { topic: string }
}) {
    return (
        <React.Fragment>
            {params.topic}
        </React.Fragment>
    )
}