import React, { useEffect, useState } from 'react';

export const GiftCards = () => {
  const [giftCards, setGiftCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessionData = async () => {
    console.log('Iniciando busca da sessão...');
    try {
      const sessionURL = '/api/sessions?items=*';
      console.log(`Fazendo requisição para: ${sessionURL}`);
      
      const response = await fetch(sessionURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('Resposta da sessão recebida:', response);

      if (!response.ok) {
        throw new Error(`Erro ao buscar sessão: ${response.status}`);
      }

      const sessionData = await response.json();
      console.log('Dados da sessão:', sessionData);

      const clientData = sessionData.namespaces.profile;
      console.log(clientData,'email')

      if (!clientData || !clientData.email?.value || !clientData.document?.value) {
        throw new Error('Cliente não autenticado ou dados incompletos na sessão.');
      }

      const client = {
        id: clientData.id?.value || 'default-id',
        email: clientData.email.value,
        document: clientData.document.value,
      };

      console.log('Dados do cliente extraídos da sessão:', client);
      return client;
    } catch (err) {
      console.error('Erro ao buscar dados da sessão:', err);
      setError('Erro ao buscar dados do cliente.');
      return null;
    }
  };

  const fetchGiftCards = async (clientData: { id: string; email: string; document: string }) => {
    console.log('Iniciando busca de Gift Cards para o cliente:', clientData);
    try {
      setLoading(true);

      const url = `/api/giftcards/_search`;
      console.log(`Fazendo requisição para o endpoint de Gift Cards: ${url}`);

      const apiKey = 'vtexappkey-guessbr-QTMZQU'; // Substitua pela sua App Key
      const apiToken = 'JEEQBKSBPXWMVEAWKPCJJQHHPWANCVUACDSEMWQEIUGSNEDZTVBLHHVPGDDHXVFIKPVAYIAZFQAKKSLKBKPPCHWNXQMQYAVTQSZYNKBTPZRCSHCWDSQINNGAAHLXWZHJ'; // Substitua pelo seu App Token

      const body = {
        filter: {
          client: clientData,
        }
      };

      console.log('Corpo da requisição:', body);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-VTEX-API-AppKey': apiKey,
          'X-VTEX-API-AppToken': apiToken,
        },
        body: JSON.stringify(body),
      });

      console.log('Resposta do endpoint Gift Cards:', response);

      if (!response.ok) {
        throw new Error(`Erro ao buscar Gift Cards: ${response.status}`);
      }

      const giftCardsData = await response.json();
      console.log('Dados dos Gift Cards recebidos:', giftCardsData);

      setGiftCards(giftCardsData.items || []);
    } catch (err) {
      console.error('Erro ao buscar Gift Cards:', err);
      setError('Erro ao buscar Gift Cards.');
    } finally {
      setLoading(false);
      console.log('Busca de Gift Cards finalizada.');
    }
  };

  useEffect(() => {
    console.log('Iniciando carregamento dos Gift Cards...');
    const loadGiftCards = async () => {
      const clientData = await fetchSessionData();
      if (clientData) {
        await fetchGiftCards(clientData);
      }
    };

    loadGiftCards();
  }, []);

  return (
    <div>
      <h3>Gift Cards do Cliente</h3>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && giftCards.length > 0 ? (
        <ul>
          {giftCards.map((card) => (
            <li key={card.id}>
              <strong>Code:</strong> {card.redemptionCode} | <strong>Saldo:</strong> {card.balance}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>Nenhum Gift Card encontrado.</p>
      )}
      <div>
        <h4>Debug Logs:</h4>
        <pre>{JSON.stringify({ giftCards, loading, error }, null, 2)}</pre>
      </div>
    </div>
  );
};


