"use client";

import { useEffect, useRef } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
    const reported = useRef(false);

    useEffect(() => {
        if (reported.current) return;
        reported.current = true;

        fetch("/api/incr", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug }),
        });
    }, [slug]);

    return null;
};