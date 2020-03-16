/*
 * w18863 2020-02-10
 */
import React, { Component } from 'react'
import SearchItem from './SearchItem'
import { Drawer, DrawerBody, DrawerHeader, DrawerSubHeader, DrawerSection, DrawerSectionBody } from 'browser-components/drawer'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          key: '1',
          name: '1. 查询设备是否存在某缺陷',
          formType: '3',
          params: [
            { name: '设备型号',
              key: '11',
              type: 'input'
            },
            {
              name: '问题单号',
              key: '12',
              type: 'input'
            }
          ],
          hide: true,
          command: 'match p1=shortestPath((n1:Dev_Switch)-[*]-(n2:Defect)) with n1,n2,p1  unwind n1.name as devname with devname,p1 where devname contains "param1" and "param2" in n2.name return p1'
        },
        {
          key: '2',
          name: '2. 查询产品版本都引入过哪些问题',
          formType: '1',
          params: [
            { name: '版本号',
              key: '21',
              type: 'input',
              hint: ['E2603', 'E1105', 'R2609H25', 'R2712', 'R2713']
            },
          ],
          hide: true,
          command: 'match p=(v:version_pdt)<-[r:defect_introduce_version]->() where "param1" in v.name return p'
        },
        {
          key: '3',
          name: '3. 查询产品版本都解决过哪些问题',
          formType: '4',
          params: [
            { name: '版本分支',
              key: '31',
              type: 'select',
              options: [
                'version_switch_branch_JR',
                'version_switch_branch_ARAD',
                'version_switch_branch_IRF3',
                'version_switch_branch_EC',
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_TD3_BOX',
                'version_switch_branch_TD3_CHIASSIS'
              ]
            },
            { name: '版本号',
              key: '32',
              type: 'input',
              hint: ['E2603', 'E1105', 'R2609H25', 'R2712', 'R2713']
            }
          ],
          hide: true,
          command: 'MATCH p=()-[r:defect_resolve_version]->(n:param1) where "param2" in n.name RETURN p'
        },
        {
          key: '4',
          name: '4. 问题单搜索——根据产品版本查询存在的已知缺陷',
          formType: '4',
          params: [
            { name: '版本分支',
              key: '41',
              type: 'select',
              options: [
                'version_switch_branch_JR',
                'version_switch_branch_ARAD',
                'version_switch_branch_IRF3',
                'version_switch_branch_EC',
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_TD3_BOX',
                'version_switch_branch_TD3_CHIASSIS'
              ]
            },
            { name: '版本号',
              key: '42',
              type: 'input',
              hint: ['E2603', 'E1105', 'R2609H25', 'R2712', 'R2713']
            }
          ],
          hide: true,
          command: 'match pi=(d_i:Defect)-[r_i:defect_introduce_version]->(v_i:param1)-[r1:version_has_child*0..]->(v:param1) with v,d_i match pr=(d_r:Defect)-[r_r:defect_resolve_version]->(v_r:param1)-[r2:version_has_child*0..]->(v) where "param2" in v.name unwind id(d_i) as id_i with collect(distinct id_i) as id_i_list,d_i,d_r unwind id_i_list as id_i_l with id_i_l,d_i,d_r unwind id(d_r) as id_r with collect(distinct id_r) as id_r_list,id_i_l,d_i where not id_i_l in id_r_list return d_i'
        },
        {
          key: '5',
          name: '5. 问题单搜索——根据配置和产品版本查询当前已知问题',
          formType: '7',
          params: [
            { name: '版本分支',
              key: '51',
              type: 'select',
              options: [
                'version_switch_branch_JR',
                'version_switch_branch_ARAD',
                'version_switch_branch_IRF3',
                'version_switch_branch_EC',
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_TD3_BOX',
                'version_switch_branch_TD3_CHIASSIS'
              ]
            },
            { name: '版本号',
              key: '52',
              type: 'input',
              hint: ['E2603', 'E1105', 'R2609H25', 'R2712', 'R2713']
            }
          ],
          hide: true,
          command: 'match pi=(d_i:Defect)-[r_i:defect_introduce_version]->(v_i:param1)-[r1:version_has_child*0..]->(v:param1) with v,d_i match pr=(d_r:Defect)-[r_r:defect_resolve_version]->(v_r:param1)-[r2:version_has_child*0..]->(v) where "param2" in v.name unwind id(d_i) as id_i with collect(distinct id_i) as id_i_list,d_i,d_r unwind id_i_list as id_i_l with id_i_l,d_i,d_r unwind id(d_r) as id_r with collect(distinct id_r) as id_r_list,id_i_l,d_i where not id_i_l in id_r_list return d_i'
        },
        {
          key: '6',
          name: '6. 查询产品版本是否存在某产品缺陷',
          formType: '5',
          params: [
            { name: '版本分支',
              key: '61',
              type: 'select',
              options: [
                'version_switch_branch_JR',
                'version_switch_branch_ARAD',
                'version_switch_branch_IRF3',
                'version_switch_branch_EC',
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_TD3_BOX',
                'version_switch_branch_TD3_CHIASSIS'
              ]
            },
            { name: '版本号',
              key: '62',
              type: 'input',
              hint: ['E2603', 'E1105', 'R2609H25', 'R2712', 'R2713']
            },
            {
              name: '缺陷ID',
              key: '63',
              type: 'input'
            }
          ],
          hide: true,
          command: 'match p_i=(n:Defect)-[r1:defect_introduce_version]-(n1:param1),p_r=(n:Defect)-[r2:defect_resolve_version]-(n2:param1) where "param3" in n.name and r1.r_p_defect_branch="param1" and r2.r_p_defect_branch="param1" with n1,n2,p_i,p_r match p1=(n1)-[*{r_p_version_trans:"param1"}]->(n:param1) where "param2" in n.name  return p1,((n2)-[*{r_p_version_trans:"param1"}]->(n)),p_i,p_r'
        },
        {
          key: '7',
          name: '7. 问题单搜索——根据comware版本查看产品引入缺陷',
          formType: '1',
          params: [
            { name: 'Comware版本号',
              key: '71',
              type: 'input'
            },
          ],
          hide: true,
          command: 'match p=(vplat:version_comware)<-[r:version_cmw_pdt_match]-(vpdt)<-[r1:defect_introduce_version]-(d:Defect) where "param1" in vplat.name return p'
        },
        {
          key: '8',
          name: '8. 问题单搜索——根据comware版本查看产品解决缺陷',
          formType: '1',
          params: [
            { name: 'Comware版本号',
              key: '81',
              type: 'input'
            },
          ],
          hide: true,
          command: 'match p=(vplat:version_comware)<-[r:version_cmw_pdt_match]-(vpdt)<-[r1:defect_resolve_version]-(d:Defect) where "param1" in vplat.name return p'
        },
        {
          key: '9',
          name: '9. 问题单搜索——查询comware存在的产品问题',
          formType: '4',
          params: [
            { name: '版本分支',
              key: '91',
              type: 'select',
              options: [
                'version_switch_branch_JR',
                'version_switch_branch_ARAD',
                'version_switch_branch_IRF3',
                'version_switch_branch_EC',
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_TD3_BOX',
                'version_switch_branch_TD3_CHIASSIS'
              ]
            },
            { name: 'Comware版本号',
              key: '92',
              type: 'input',
            }
          ],
          hide: true,
          command: 'match pi=(d_i:Defect)-[r_i:defect_introduce_version]->(v_i:param1)-[r1:version_has_child*0..]->(v:param1)-[r2:version_cmw_pdt_match]->(vplat:version_comware) with v,vplat,d_i match pr=(d_r:Defect)-[r_r:defect_resolve_version]->(v_r:param1)-[r3:version_has_child*0..]->(v) where "param2" in vplat.name unwind id(d_i) as id_i with collect(distinct id_i) as id_i_list,d_i,d_r unwind id_i_list as id_i_l with id_i_l,d_i,d_r unwind id(d_r) as id_r with collect(distinct id_r) as id_r_list,id_i_l,d_i where not id_i_l in id_r_list return d_i'
        },
        {
          key: '10',
          name: '10. 问题单搜索——根据配置和comware版本查询当前已知问题',
          formType: '7',
          params: [
            { name: '版本分支',
              key: '101',
              type: 'select',
              options: [
                'version_switch_branch_JR',
                'version_switch_branch_ARAD',
                'version_switch_branch_IRF3',
                'version_switch_branch_EC',
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_TD3_BOX',
                'version_switch_branch_TD3_CHIASSIS'
              ]
            },
            { name: 'Comware版本号',
              key: '102',
              type: 'input'
            }
          ],
          hide: true,
          command: 'match pi=(d_i:Defect)-[r_i:defect_introduce_version]->(v_i:param1)-[r1:version_has_child*0..]->(v:param1)-[r2:version_cmw_pdt_match]->(vplat:version_comware) with v,vplat,d_i match pr=(d_r:Defect)-[r_r:defect_resolve_version]->(v_r:param1)-[r3:version_has_child*0..]->(v) where "param2" in vplat.name unwind id(d_i) as id_i with collect(distinct id_i) as id_i_list,d_i,d_r unwind id_i_list as id_i_l with id_i_l,d_i,d_r unwind id(d_r) as id_r with collect(distinct id_r) as id_r_list,id_i_l,d_i where not id_i_l in id_r_list return d_i'
        },
        {
          key: '11',
          name: '11. 查询当前comware版本是否存在某问题单缺陷',
          formType: '5',
          params: [
            { name: '版本分支',
              key: '111',
              type: 'select',
              options: [
                'version_switch_branch_JR',
                'version_switch_branch_ARAD',
                'version_switch_branch_IRF3',
                'version_switch_branch_EC',
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_TD3_BOX',
                'version_switch_branch_TD3_CHIASSIS'
              ]
            },
            { name: 'Comware版本号',
              key: '112',
              type: 'input',
            },
            {
              name: '缺陷ID',
              key: '113',
              type: 'input'
            }
          ],
          hide: true,
          command: 'match p_i=(n:Defect)-[r1:defect_introduce_version]-(n1:param1),p_r=(n:Defect)-[r2:defect_resolve_version]-(n2:param1) \n' +
            'where "param3" in n.name and r1.r_p_defect_branch="param1" and r2.r_p_defect_branch="param1" with n1,n2,p_i,p_r\n' +
            'match p1=(n1)-[*{r_p_version_trans:"param1"}]->(n:param1)-[rplat:version_cmw_pdt_match]->(nplat:version_comware)\n' +
            'where  "param2" in nplat.name  return p1,((n2)-[*{r_p_version_trans:"param1"}]->(n)),p_i,p_r\n'
        },
        {
          key: '12',
          name: '12. 问题单搜索——根据问题单描述关键词查找库上问题单',
          formType: '1',
          params: [
            {
              name: '描述关键词',
              key: '121',
              type: 'input'
            }
          ],
          hide: true,
          command: 'match (n) with n.i_p_describe as des_list,n unwind des_list as des with des,n where des contains "param1" return n'
        },
        {
          key: '13',
          name: '13. 问题单搜索——根据描述配置信息关键词查找库上问题单',
          formType: '1',
          params: [
            {
              name: '配置关键词',
              key: '131',
              type: 'input'
            }
          ],
          hide: true,
          command: 'match (n) with n.i_p_key_config as des_list,n unwind des_list as des with des,n where des contains "param1" return n'
        },
        {
          key: '14',
          name: '14. 问题单搜索——根据设备形态查找库上相关问题单',
          formType: '2',
          params: [
            {
              name: '设备形态',
              key: '141',
              type: 'select',
              options: ['Dev_Switch_CHASSIS', 'Dev_Swithc_BOX']
            }
          ],
          hide: true,
          command: 'match p=(d:param1)-[r1:dev_about_soft_branch]->(n1)-[r2:version_branch_hasPdt]->(n2)<-[r3:defect_introduce_version]-(n:Defect) return p,n'
        },
        {
          key: '15',
          name: '15. 问题单搜索——根据设备形态和问题单描述关键词搜索相关问题单',
          formType: '4',
          params: [
            {
              name: '设备形态',
              key: '152',
              type: 'select',
              options: ['Dev_Switch_CHASSIS', 'Dev_Swithc_BOX']
            },
            {
              name: '描述关键词',
              key: '151',
              type: 'input'
            },
          ],
          hide: true,
          command: 'match (n:Defect) with n.i_p_describe as des_list,n unwind des_list as des with des,n where des contains "param2" with n match p=(d:param1)-[r1:dev_about_soft_branch]->(n1)-[r2:version_branch_hasPdt]->(n2)<-[r3:defect_introduce_version]-(n) return p,n'
        },
        {
          key: '16',
          name: '16. 问题单搜索——根据设备形态和配置命令关键词搜索相关问题单',
          formType: '4',
          params: [
            {
              name: '设备形态',
              key: '162',
              type: 'select',
              options: ['Dev_Switch_CHASSIS', 'Dev_Swithc_BOX']
            },
            {
              name: '配置关键词',
              key: '161',
              type: 'input'
            },
          ],
          hide: true,
          command: 'match (n:Defect) with n.i_p_key_config as cfg_list,n unwind cfg_list as cfg with cfg,n where cfg contains "param2" with n match p=(d:param1)-[r1:dev_about_soft_branch]->(n1)-[r2:version_branch_hasPdt]->(n2)<-[r3:defect_introduce_version]-(n) return p,n'
        },
        {
          key: '17',
          name: '17. 问题单搜索——根据设备形态、配置命令和问题单描述关键词搜索相关问题单',
          formType: '5',
          params: [
            {
              name: '设备形态',
              key: '173',
              type: 'select',
              options: ['Dev_Switch_CHASSIS', 'Dev_Swithc_BOX']
            },
            {
              name: '描述关键词',
              key: '171',
              type: 'input'
            },
            {
              name: '配置关键词',
              key: '172',
              type: 'input'
            },
          ],
          hide: true,
          command: 'match (n:Defect) with n.i_p_describe as des_list,n unwind des_list as des with des,n where des contains "param2" with n,n.i_p_key_config as cfg_list unwind cfg_list as cfg with cfg,n where cfg contains "param3" with n match p=(d:param1)-[r1:dev_about_soft_branch]->(n1)-[r2:version_branch_hasPdt]->(n2)<-[r3:defect_introduce_version]-(n) return p,n'
        },
        {
          key: '18',
          name: '18. 查询某产品问题对应的comware版本号',
          formType: '1',
          params: [
            {
              name: '缺陷ID',
              key: '181',
              type: 'input'
            }
          ],
          hide: true,
          command: 'match p=(n1:Defect)-[*1..2]-(n2:version_comware) where "param1" in n1.name return p,n2'
        },
        {
          key: '19',
          name: '19. 展示comware版本分支',
          formType: '2',
          params: [
            {
              name: '版本分支',
              key: '191',
              type: 'select',
              options: [
                'version_comware_B23',
                'version_comware_B35',
                'version_comware_B45',
                'version_comware_B70'
              ]
            }
          ],
          hide: true,
          command: 'MATCH p=()-[r:version_has_child{r_p_version_trans:"param1"}]->() RETURN p'
        },
        {
          key: '20',
          name: '20. 展示交换机产品版本分支',
          formType: '2',
          params: [
            {
              name: '版本分支',
              key: '201',
              type: 'select',
              options: [
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_EC',
                'version_switch_branch_IRF3',
                'version_switch_branch_TD3',
                'version_switch_branch_ARAD',
                'version_switch_branch_JR'
              ]
            }
          ],
          hide: true,
          command: 'MATCH p=()-[r:version_has_child{r_p_version_trans:"param1"}]->() RETURN p'
        },
        {
          key: '21',
          name: '21. 展示平台版本和交换机版本的对应关系',
          formType: '2',
          params: [
            {
              name: '版本分支',
              key: '211',
              type: 'select',
              options: [
                'version_switch_branch_58v2',
                'version_switch_branch_58v3',
                'version_switch_branch_EC',
                'version_switch_branch_IRF3',
                'version_switch_branch_TD3',
                'version_switch_branch_ARAD',
                'version_switch_branch_JR'
              ]
            }
          ],
          hide: true,
          command: 'MATCH p=(n:param1)-[r:version_cmw_pdt_match]->() RETURN p'
        },
        {
          key: '22',
          name: '22. 展示产品类型',
          formType: '2',
          params: [
            {
              name: '产品类型',
              key: '221',
              type: 'select',
              options: [
                'Dev_Cloud',
                'Dev_Switch',
                'Dev_Server',
                'Dev_NewNet',
                'Dev_Router',
                'Dev_Store',
                'Dev_Wlan',
                'Dev_ZiGuang',
                'Dev_ExtPdt'
              ]
            }
          ],
          hide: true,
          command: 'MATCH p=()-[r:dev_contains]->(n:param1) RETURN p'
        },
        {
          key: '23',
          name: '23. 展示生命周期一样的问题单',
          formType: '6',
          params: [{}],
          hide: true,
          command: 'match p1=(n1:Defect)-[r1:defect_introduce_version]->(v1),p2=(n2:Defect)-[r2:defect_introduce_version]->(v1),p3=(n1:Defect)-[r3:defect_resolve_version]->(v2) ,p4=(n2:Defect)-[r4:defect_resolve_version]->(v2) where v1.i_p_branch=v2.i_p_branch return p1,p2,p3,p4'
        },
        {
          key: '24',
          name: '24. 按照关系类型显示关系',
          formType: '2',
          params: [{
            name: '关系类型',
            key: '241',
            type: 'select',
            options: []
          }],
          hide: true,
          command: 'MATCH p=()-[r:param1]->() RETURN p LIMIT 25'
        },
      ]
    }
  }

  render() {
    const listOfItems = this.state.items.map(item => {
      return (
        <SearchItem item={item} key={item.key} />
      )
    })
    return (
      <Drawer id="db-search">
        <DrawerHeader>搜索</DrawerHeader>
        <DrawerBody style={{marginBottom: '100px'}}>
          <DrawerSection>
            <DrawerSubHeader>常见问题</DrawerSubHeader>
            <DrawerSectionBody>
              <ul className="search-list">{listOfItems}</ul>
            </DrawerSectionBody>
          </DrawerSection>
        </DrawerBody>
      </Drawer>
    )
  }

}

export default Search
