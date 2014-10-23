/**
 * Created by wuxianru on 14-8-12.
 */
function HostCtl($scope,$http){

    $scope.connect=function(){
        $http.post('/ns/connect',$scope.host).
            success(function (respdate){
                $scope.resp=respdate;
            }).error(function(data,status,headers,config){
                $scope.resp={resMsg:status+data};
            });
    }

    $scope.refresh=function(){
        $http.get('/ns/refresh').
            success(function (respdate){
                $scope.output+=ansi2html(respdate);
            });
    }

    $scope.execute=function(){
        if($scope.command.line){
            $http.post('/ns/execute',$scope.command).
                success(function (respdate){
                    $scope.command.line='';
                    $scope.refresh();
                });
        }
        $scope.refresh();


    }

    $scope.getOutput=function(){

    }
}
