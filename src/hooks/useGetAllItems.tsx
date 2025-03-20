'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllItems = () => {
    return useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const response = await axios.get('/api/items/getAll');
            return response.data;
        },
        staleTime: 1000 * 60 * 1, // 1 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};
