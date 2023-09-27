import React from 'react';
import { gql } from "../__generated__/";
import { useQuery } from "@apollo/client";

const USERS_QUERY = gql(`
query GetUsers {
    users {
      id,
      login
    }
}`);

const Users = () => {
    const { loading, error, data } = useQuery(USERS_QUERY);
    
    if (loading) return <div>Loading ...</div>;

    if (error) return <div>{`Error! ${error.message}`}</div>;

    return <div>{JSON.stringify(data)}</div>;
}

export default Users;