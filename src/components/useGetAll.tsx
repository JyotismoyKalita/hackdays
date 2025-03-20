'use client';
import { getAll } from '@/lib/getAll';
import { useQuery } from '@tanstack/react-query';

export const useGetAll = () => {
    return useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            const response = await getAll();
            return response;
        },
    });
};
