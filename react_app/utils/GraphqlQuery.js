import React from 'react';
import axios from 'axios';
import { ngrok_django_site } from './EnvironmentVars';

export function QueryGraphql(da_query) {
    return axios({
        url: `${ngrok_django_site}/graphql`,
        method: 'post',
        data: {
            query: `
                query {
                  ${da_query}
                }
            `
        }
    })
}