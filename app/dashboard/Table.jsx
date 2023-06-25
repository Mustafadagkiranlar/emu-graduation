import React from 'react'

export default function Table() {
  return (
    <div className="overflow-x-auto my-10">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>company</th>
                <th>location</th>
                <th>Last Login</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>17</th>
                <td>Alec Lethby</td>
                <td>Teacher</td>
                <td>Reichel, Glover and Hamill</td>
                <td>China</td>
                <td>2/28/2021</td>
                <td>Khaki</td>
              </tr>
              <tr>
                <th>18</th>
                <td>Aland Wilber</td>
                <td>Quality Control Specialist</td>
                <td>Kshlerin, Rogahn and Swaniawski</td>
                <td>Czech Republic</td>
                <td>9/29/2020</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>19</th>
                <td>Teddie Duerden</td>
                <td>Staff Accountant III</td>
                <td>Pouros, Ullrich and Windler</td>
                <td>France</td>
                <td>10/27/2020</td>
                <td>Aquamarine</td>
              </tr>
              <tr>
                <th>20</th>
                <td>Lorelei Blackstone</td>
                <td>Data Coordiator</td>
                <td>Witting, Kutch and Greenfelder</td>
                <td>Kazakhstan</td>
                <td>6/3/2020</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
  )
}
