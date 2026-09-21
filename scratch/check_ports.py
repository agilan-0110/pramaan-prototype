import socket

ports = [3000, 5000, 5173, 8000, 8080]
for p in ports:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    res = sock.connect_ex(('127.0.0.1', p))
    status = "OPEN" if res == 0 else "CLOSED"
    print(f"Port {p}: {status}")
    sock.close()
