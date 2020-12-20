<template>
<mdb-container>
    <mdb-view>
        <br /><br /><br />
        <mdb-card>
            <h3 class="card-header mdb-color accent-1  text-center white-text font-weight-bold py-4">User Manage</h3>
            <mdb-card-body>

                <mdb-tbl btn responsive striped fixed class="table table-hover mb-0">
                    <mdb-tbl-head>
                        <tr>
                            <th><strong>User Name</strong></th>
                            <th><strong>Permission</strong></th>
                            <th><strong>Update</strong></th>
                            <th><strong>Edit</strong></th>
                        </tr>
                    </mdb-tbl-head>
                    <mdb-tbl-body>
                        <tr>
                            <td scope="row">3</td>
                            <td>Larry
                            </td>
                            <td>the Bird

                            </td>
                            <td>
                                <mdb-btn-group>
                                    <mdb-btn @click="editable=true" color="secondary" size="sm" rounded>
                                        <mdb-icon icon="edit" class="white-text" fa />
                                    </mdb-btn>
                                    <mdb-btn @click="deletable=true" color="warning" size="sm" rounded>
                                        <mdb-icon icon="trash-alt" class="red-text" />
                                    </mdb-btn>
                                </mdb-btn-group>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">3</td>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <mdb-btn-group>
                                    <mdb-btn @click="editable=true" color="secondary" size="sm" rounded>
                                        <mdb-icon icon="edit" class="white-text" fa />
                                    </mdb-btn>
                                    <mdb-btn @click="deletable=true" color="warning" size="sm" rounded>
                                        <mdb-icon icon="trash-alt" class="red-text" />
                                    </mdb-btn>
                                </mdb-btn-group>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">3</td>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <mdb-btn-group>
                                    <mdb-btn @click="editable=true" color="secondary" size="sm" rounded>
                                        <mdb-icon icon="edit" class="white-text" fa />
                                    </mdb-btn>
                                    <mdb-btn @click="deletable=true" color="warning" size="sm" rounded>
                                        <mdb-icon icon="trash-alt" class="red-text" />
                                    </mdb-btn>
                                </mdb-btn-group>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">3</td>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <mdb-btn-group>
                                    <mdb-btn @click="editable=true" color="secondary" size="sm" rounded>
                                        <mdb-icon icon="edit" class="white-text" fa />
                                    </mdb-btn>
                                    <mdb-btn @click="deletable=true" color="warning" size="sm" rounded>
                                        <mdb-icon icon="trash-alt" class="red-text" />
                                    </mdb-btn>
                                </mdb-btn-group>
                            </td>
                        </tr>
                    </mdb-tbl-body>
                </mdb-tbl>

            </mdb-card-body>
        </mdb-card>
    </mdb-view>
    
    <mdb-modal :show="editable" @close="editable = false" info centered>
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">Edit</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 text-left">
        <mdb-input label="Your name" icon="user" class="mb-5" iconClass="grey-text"/>
        <mdb-input label="password" icon="lock" type="password" class="mb-5" iconClass="grey-text"/>
        <mdb-input label="permission" icon="users" class="mb-5" iconClass="grey-text"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click.native="editable = false" rounded color="info">Change <mdb-icon icon="paper-plane" class="ml-1"/></mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal :show="deletable" @close="deletable = false" centered size="sm" class="text-center" danger>
      <mdb-modal-header center :close="false">
        <p class="heading">Are you sure?</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-icon icon="times" size="4x" class="animated rotateIn"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn outline="danger" @click="deletable = false">Yes</mdb-btn>
        <mdb-btn color="danger" @click="deletable = false">No</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

</mdb-container>
</template>

<script>
import {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    mdbIcon,
    mdbBtnGroup,
    mdbBtn,
    mdbContainer,
    mdbCard,
    mdbCardBody,
    mdbView,
    mdbTblHead,
    mdbTblBody,
    mdbTbl,
} from "mdbvue";

export default {
    name: "Datatable2Page",
    components: {
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
        mdbInput,
        mdbIcon,
        mdbBtnGroup,
        mdbBtn,
        mdbContainer,
        mdbCard,
        mdbCardBody,
        mdbView,
        mdbTblHead,
        mdbTblBody,
        mdbTbl,
    },
    computed: {
        // data13() {
        //   return {
        //     columns: this.columns,
        //     rows: this.rows.map(row => ({...row, date: new Date(row.date)}))
        //   }
        // }

    },
    methods: {
        filterData(dataArr, keys) {
            let data = dataArr.map(entry => {
                let filteredEntry = {};
                keys.forEach(key => {
                    if (key in entry) {
                        filteredEntry[key] = entry[key];
                    }
                });
                return filteredEntry;
            });
            return data;
        }
    },
    mounted() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(json => {
                let keys = ["id", "title", "completed"];
                let entries = this.filterData(json, keys);
                //columns
                const columns = keys.map(key => {
                    return {
                        label: key.toUpperCase(),
                        field: key,
                        sort: true
                    };
                });
                //rows

                this.data14 = {
                    columns,
                    rows: entries
                }
            })
            .catch(err => console.log(err));
    },
    data() {
        return {
            search: '',
            search3: '',
            selected: '',
            multiselected: '',
            editable: false,
            deletable: false,
            data12: {
                columns: [{
                        label: "Name",
                        field: "name",
                        sort: true
                    },
                    {
                        label: "Permission",
                        field: "permission",
                        sort: true
                    },
                    {
                        label: "LastUpdate",
                        field: "lastupdate",
                        sort: true,
                    },

                ],
                rows: [{
                        name: "Tiger Nixon",
                        permission: "System Architect",
                        lastupdate: "sdkdlslsl",
                    },

                ]
            },
            footer: '<th>Name</th><th>Position</th><th>Office</th><th>Age</th><th>Start date</th><th>Salary</th>',
        }
    },
}
</script>
