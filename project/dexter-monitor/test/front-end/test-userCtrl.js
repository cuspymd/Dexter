/**
 * Copyright (c) 2016 Samsung Electronics, Inc.,
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
describe('UserCtrl Test', function() {

    beforeEach(module('dexterMonitorApp'));

    var $controller, $httpBackend, user;

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        user = $controller('UserCtrl', {$scope: {}});
    }));

    describe('initialize()', function() {
        it('should set values properly', function() {
            $httpBackend.whenGET('/api/v2/user')
                .respond({status:'ok', rows:[
                    {userId: 'testid1'}, {userId: 'testid2'}
                ]});
            $httpBackend
                .whenGET('/api/v2/user/extra-info/' + 'testid1,testid2')
                .respond({status:'ok', rows:[
                    {userId:'testid1', name:'myname1', department:'VD1', title: 'engineer1', employeeNumber: 1234},
                    {userId:'testid2', name:'myname2', department:'VD2', title: 'engineer2', employeeNumber: 5678}
                ]});

            $httpBackend.flush();

            assert.equal(user.gridOptions.data[0].userId, 'testid1');
            assert.equal(user.gridOptions.data[1].userId, 'testid2');

            user.getExtraInfo();
            $httpBackend.flush();

            assert.equal(user.gridOptions.data[0].userId, 'testid1');
            assert.equal(user.gridOptions.data[0].name, 'myname1');
            assert.equal(user.gridOptions.data[0].department, 'VD1');
            assert.equal(user.gridOptions.data[0].title, 'engineer1');
            assert.equal(user.gridOptions.data[0].employeeNumber, 1234);
            assert.equal(user.gridOptions.data[1].userId, 'testid2');
            assert.equal(user.gridOptions.data[1].name, 'myname2');
            assert.equal(user.gridOptions.data[1].department, 'VD2');
            assert.equal(user.gridOptions.data[1].title, 'engineer2');
            assert.equal(user.gridOptions.data[1].employeeNumber, 5678);
        });
    });
});