var SocketManager = Base.extend({
	constructor : function () {
        this.socketConnections = [];
	},
	
	createSocket : function(name, serverAddress, port) {
        this.socketConnections[name] = new SocketConnection(serverAddress, port);
    },

    getSocket : function(name) {
        return this.socketConnections[name];
    }
});