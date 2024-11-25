// @ts-nocheck
import { goto } from '$app/navigation';

async function fetchAPI(endpoint, options = {}, requiresAuth = true, queryParams = {}, isFileDownload = false) {
    const headers = {
        ...options.headers,
    };

    if (!isFileDownload) {
        // Assuming application/json for non-file downloads
        headers['Content-Type'] = 'application/json';
    }

    if (requiresAuth) {
        const token = localStorage.getItem('access_token');
        if (!token) {
            goto('/auth');
            throw new Error('Authentication required');
        }
        headers['Authorization'] = `Bearer ${token}`;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = queryString ? `${endpoint}?${queryString}` : endpoint;

    try {
        const base_url = import.meta.env.VITE_BACKEND_BASE_URL;
        const response = await fetch(`${base_url}${urlWithParams}`, { ...options, headers });

        if (response.status === 401) {
            goto('/auth');
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API request failed');
        }

        if (isFileDownload) {
            const blob = await response.blob();
            const contentDisposition = response.headers.get('content-disposition');
            let fileName = 'file';
            console.log(contentDisposition);
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.*?)"?(;|$)/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export async function login_user(username, password) {
    try {
        const data = await fetchAPI('/api/auth/token/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }, false);
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        goto('/');
    } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
    }
}

export function logout_user() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    goto('/auth');
}

export async function get_user_account() {
    try {
        return await fetchAPI('/api/auth/user/', { method: 'GET' });
    } catch (error) {
        console.error('Fetching failed:', error.message);
    }
}
