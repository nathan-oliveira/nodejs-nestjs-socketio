import { Button, MenuItem, Select } from '@material-ui/core';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const Mapping: React.FunctionComponent = () => {
  const socketIORef = useRef<any>();
  const [routes, setRoutes] = useState<any[]>([]);
  const [routeIdSelected, setRouteIdSelect] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((data) => data.json())
      .then((data) => setRoutes(data));
  }, []);

  useEffect(() => {
    socketIORef.current = io('http://localhost:3000').connect();

    socketIORef.current.on('connect', () => {
      socketIORef.current.emit('message', {
        message: 'conectado!',
      })
    });

    socketIORef.current.on('receive-message', (data: any) => {
      console.log(data);
    });
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(routeIdSelected);
    socketIORef.current.emit('new-direction', { routeId: routeIdSelected });
  };

  return (
    <form onSubmit={onSubmit}>
      <Select
        fullWidth
        displayEmpty
        value={routeIdSelected}
        onChange={(event) => setRouteIdSelect(`${event.target.value}`)}>
        <MenuItem value="">
          <em>Selecione uma rota</em>
        </MenuItem>
        {routes.map((route, key) => (
          <MenuItem key={key} value={route._id}>
            {route.title}
          </MenuItem>
        ))}
      </Select>

      <Button type="submit" variant="contained">Iniciar corridas</Button>
    </form>
  );
};
