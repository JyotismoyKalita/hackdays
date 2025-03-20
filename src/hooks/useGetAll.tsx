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
        staleTime: 1000 * 60 * 1, // 1 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};
