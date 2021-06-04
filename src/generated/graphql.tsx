import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Crypto = {
  __typename?: 'Crypto';
  name: Scalars['String'];
  amount: Scalars['Float'];
};

export type FieldErrors = {
  __typename?: 'FieldErrors';
  field: Scalars['String'];
  error: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  addStocks: Scalars['Boolean'];
  addCrypto: Scalars['Boolean'];
  editValue: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  userInput: UserLoginInput;
};


export type MutationLoginArgs = {
  userInput: UserLoginInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationAddStocksArgs = {
  stocksInput: Array<StocksInput>;
};


export type MutationAddCryptoArgs = {
  cryptoInput: Array<CryptoInput>;
};


export type MutationEditValueArgs = {
  amount: Scalars['Float'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  id: Scalars['Float'];
  userId: Scalars['Float'];
  stocks: Array<Stock>;
  crypto: Array<Crypto>;
  user: User;
  value: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<User>>;
  me?: Maybe<UserResponse>;
  myPortfolio?: Maybe<Portfolio>;
};

export type Stock = {
  __typename?: 'Stock';
  symbol: Scalars['String'];
  shares: Scalars['Float'];
  value: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  portfolio?: Maybe<Portfolio>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldErrors>>;
};

export type CryptoInput = {
  name: Scalars['String'];
  amount: Scalars['Float'];
};

export type StocksInput = {
  symbol: Scalars['String'];
  shares: Scalars['Float'];
  value: Scalars['Float'];
};

export type PortfolioSnippetFragment = (
  { __typename?: 'Portfolio' }
  & Pick<Portfolio, 'id' | 'userId' | 'value'>
  & { stocks: Array<(
    { __typename?: 'Stock' }
    & Pick<Stock, 'symbol' | 'shares' | 'value'>
  )>, crypto: Array<(
    { __typename?: 'Crypto' }
    & Pick<Crypto, 'name' | 'amount'>
  )> }
);

export type EditValueMutationVariables = Exact<{
  amount: Scalars['Float'];
}>;


export type EditValueMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editValue'>
);

export type AddCryptoToPortfolioMutationVariables = Exact<{
  cryptoInput: Array<CryptoInput> | CryptoInput;
}>;


export type AddCryptoToPortfolioMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCrypto'>
);

export type AddStocksToPortfolioMutationVariables = Exact<{
  stocksInput: Array<StocksInput> | StocksInput;
}>;


export type AddStocksToPortfolioMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addStocks'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldErrors' }
      & Pick<FieldErrors, 'field' | 'error'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldErrors' }
      & Pick<FieldErrors, 'field' | 'error'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
      & { portfolio?: Maybe<(
        { __typename?: 'Portfolio' }
        & PortfolioSnippetFragment
      )> }
    )> }
  )> }
);

export type MyPortfolioQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPortfolioQuery = (
  { __typename?: 'Query' }
  & { myPortfolio?: Maybe<(
    { __typename?: 'Portfolio' }
    & PortfolioSnippetFragment
  )> }
);

export const PortfolioSnippetFragmentDoc = gql`
    fragment PortfolioSnippet on Portfolio {
  id
  userId
  value
  stocks {
    symbol
    shares
    value
  }
  crypto {
    name
    amount
  }
}
    `;
export const EditValueDocument = gql`
    mutation EditValue($amount: Float!) {
  editValue(amount: $amount)
}
    `;
export type EditValueMutationFn = Apollo.MutationFunction<EditValueMutation, EditValueMutationVariables>;

/**
 * __useEditValueMutation__
 *
 * To run a mutation, you first call `useEditValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editValueMutation, { data, loading, error }] = useEditValueMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useEditValueMutation(baseOptions?: Apollo.MutationHookOptions<EditValueMutation, EditValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditValueMutation, EditValueMutationVariables>(EditValueDocument, options);
      }
export type EditValueMutationHookResult = ReturnType<typeof useEditValueMutation>;
export type EditValueMutationResult = Apollo.MutationResult<EditValueMutation>;
export type EditValueMutationOptions = Apollo.BaseMutationOptions<EditValueMutation, EditValueMutationVariables>;
export const AddCryptoToPortfolioDocument = gql`
    mutation AddCryptoToPortfolio($cryptoInput: [cryptoInput!]!) {
  addCrypto(cryptoInput: $cryptoInput)
}
    `;
export type AddCryptoToPortfolioMutationFn = Apollo.MutationFunction<AddCryptoToPortfolioMutation, AddCryptoToPortfolioMutationVariables>;

/**
 * __useAddCryptoToPortfolioMutation__
 *
 * To run a mutation, you first call `useAddCryptoToPortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCryptoToPortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCryptoToPortfolioMutation, { data, loading, error }] = useAddCryptoToPortfolioMutation({
 *   variables: {
 *      cryptoInput: // value for 'cryptoInput'
 *   },
 * });
 */
export function useAddCryptoToPortfolioMutation(baseOptions?: Apollo.MutationHookOptions<AddCryptoToPortfolioMutation, AddCryptoToPortfolioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCryptoToPortfolioMutation, AddCryptoToPortfolioMutationVariables>(AddCryptoToPortfolioDocument, options);
      }
export type AddCryptoToPortfolioMutationHookResult = ReturnType<typeof useAddCryptoToPortfolioMutation>;
export type AddCryptoToPortfolioMutationResult = Apollo.MutationResult<AddCryptoToPortfolioMutation>;
export type AddCryptoToPortfolioMutationOptions = Apollo.BaseMutationOptions<AddCryptoToPortfolioMutation, AddCryptoToPortfolioMutationVariables>;
export const AddStocksToPortfolioDocument = gql`
    mutation AddStocksToPortfolio($stocksInput: [stocksInput!]!) {
  addStocks(stocksInput: $stocksInput)
}
    `;
export type AddStocksToPortfolioMutationFn = Apollo.MutationFunction<AddStocksToPortfolioMutation, AddStocksToPortfolioMutationVariables>;

/**
 * __useAddStocksToPortfolioMutation__
 *
 * To run a mutation, you first call `useAddStocksToPortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStocksToPortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStocksToPortfolioMutation, { data, loading, error }] = useAddStocksToPortfolioMutation({
 *   variables: {
 *      stocksInput: // value for 'stocksInput'
 *   },
 * });
 */
export function useAddStocksToPortfolioMutation(baseOptions?: Apollo.MutationHookOptions<AddStocksToPortfolioMutation, AddStocksToPortfolioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStocksToPortfolioMutation, AddStocksToPortfolioMutationVariables>(AddStocksToPortfolioDocument, options);
      }
export type AddStocksToPortfolioMutationHookResult = ReturnType<typeof useAddStocksToPortfolioMutation>;
export type AddStocksToPortfolioMutationResult = Apollo.MutationResult<AddStocksToPortfolioMutation>;
export type AddStocksToPortfolioMutationOptions = Apollo.BaseMutationOptions<AddStocksToPortfolioMutation, AddStocksToPortfolioMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(userInput: {email: $email, password: $password}) {
    user {
      id
      email
      createdAt
      updatedAt
    }
    errors {
      field
      error
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(userInput: {email: $email, password: $password}) {
    user {
      id
      email
      createdAt
      updatedAt
    }
    errors {
      field
      error
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      email
      portfolio {
        ...PortfolioSnippet
      }
      createdAt
      updatedAt
    }
  }
}
    ${PortfolioSnippetFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyPortfolioDocument = gql`
    query MyPortfolio {
  myPortfolio {
    ...PortfolioSnippet
  }
}
    ${PortfolioSnippetFragmentDoc}`;

/**
 * __useMyPortfolioQuery__
 *
 * To run a query within a React component, call `useMyPortfolioQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPortfolioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPortfolioQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPortfolioQuery(baseOptions?: Apollo.QueryHookOptions<MyPortfolioQuery, MyPortfolioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPortfolioQuery, MyPortfolioQueryVariables>(MyPortfolioDocument, options);
      }
export function useMyPortfolioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPortfolioQuery, MyPortfolioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPortfolioQuery, MyPortfolioQueryVariables>(MyPortfolioDocument, options);
        }
export type MyPortfolioQueryHookResult = ReturnType<typeof useMyPortfolioQuery>;
export type MyPortfolioLazyQueryHookResult = ReturnType<typeof useMyPortfolioLazyQuery>;
export type MyPortfolioQueryResult = Apollo.QueryResult<MyPortfolioQuery, MyPortfolioQueryVariables>;