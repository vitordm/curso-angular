angular.module("meusServicos", ['ngResource'])
    .factory('recursoFoto', function($resource) {
        return $resource("/v1/fotos/:fotoId", null, {
            update: {
                method: "PUT"
            }
        })
    })
    .factory("cadastroFotos", function(recursoFoto, $q, $rootScope) {
        var servico = {};
        var evento = "fotoCadastrada";
        servico.cadastrar = function(foto) {
            return $q(function(resolve, reject){
                if (foto._id) {
                    recursoFoto.update({fotoId: foto._id}, foto, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem : "Foto alterada com sucesso!",
                            inclusao: false
                        })
                    }, function(err) {
                        console.error(err);
                        reject({mensagem : "Erro ao alterar!"});
                    });
                }
                else {
                    recursoFoto.save(foto, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem : "Foto cadastrada com sucesso!",
                            inclusao: true
                        })
                    }, function(err) {
                        console.error(err);
                        reject({mensagem : "Erro ao cadastrar!"});
                    })
                }
            });
        };

        return servico;
    });