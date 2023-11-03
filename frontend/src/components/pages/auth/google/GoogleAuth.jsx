import { useEffect } from 'react';
import { useQuery } from '../../../../hooks/useQuery';
import { createUserGoogle } from '../../../../functions/httpRequests';
import Loading from '../../../UI/Loading';

const GoogleAuth = () => {
  const query = useQuery();
  const state = query.get('state');
  const code = query.get('code');

  const createuser = async (state, code) => {
    const response = await createUserGoogle(state, code);
    console.log('response', response);
  };

  useEffect(() => {
    if (!query) return;

    createuser(state, code);

    console.log('state', query.get('state'));
    console.log('code', query.get('code'));
  }, []);

  return <Loading type="bars" />;
};

export default GoogleAuth;
