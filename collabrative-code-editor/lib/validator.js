"use client"

import { z } from "zod"

export const roommFormSchema = z.object({
    roomName: z.string().min(2).max(50),
    codingLang: z.string(),
    idPublic: z.boolean().default(false),
})
