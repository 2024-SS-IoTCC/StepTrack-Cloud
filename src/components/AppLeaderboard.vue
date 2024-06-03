<template>
  <div class="container">
    <div class="leaderboard-container">
      <!-- Button Group - Mode-Selection -->
      <div class="btn-group">
        <a href="#" class="btn btn-primary" v-bind:class="(view === 'today') ? 'active' : ''" @click="changeView('today')">Last 24 hours</a>
        <a href="#" class="btn btn-primary" v-bind:class="(view === 'week') ? 'active' : ''" @click="changeView('week')">Last 7 days</a>
        <a href="#" class="btn btn-primary" v-bind:class="(view === 'month') ? 'active' : ''" @click="changeView('month')">Last 30 days</a>
        <a href="#" class="btn btn-primary" v-bind:class="(view === 'log') ? 'active' : ''" @click="changeView('log')">Logging</a>
      </div>

      <!-- Show View-Content -->
      <div class="view-content">

        <!-- Loading Spinner -->
        <div class="spinner-border" v-if="!hasData" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        
        <div v-if="hasData" class="leaderboard-box">
          <!-- If stepsData is empty, we will show a message -->
          <div v-if="!stepsData.length" class="empty-container alert alert-warning">
            No step data available!
          </div>

          <!-- If stepsData is not empty, show Chart-Box/Log-Table -->
          <div v-if="stepsData.length">

            <!-- Chart-Box -->
            <div v-if="view !== 'log'" class="chart-container">
              <Bar :data="barChartData" :options="barChartOptions" />
            </div>

            <!-- Log-Table (all entries) -->
            <div v-if="view === 'log'">
              <!-- Show User-Filter, if active -->
              <div v-if="userFilter !== ''" class="table-filter-container">
                Filter: <span class="active-filter">
                  {{ userFilter }} <a href="#" class="badge bg-danger" @click="showDataByUsername('')">clear</a>
                </span>
              </div>
              <!-- Log-Data-Table -->
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Steps</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="step in stepsData" :key="step.id">
                    <td scope="row">
                      {{ step.id }}
                    </td>
                    <td>
                      <a v-if="step.username && step.username !== ''" href="#"
                        @click="showDataByUsername(step.username)">{{ step.username }}</a>
                      <span v-else>ANON</span>
                    </td>
                    <td>{{ step.steps }}</td>
                    <td>{{ step.start }}</td>
                    <td>{{ step.end }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .leaderboard-container {
    padding: 15px 8px 10px 8px;
    text-align: left;
  }

  .view-content {
    margin-top: 20px;
    text-align: center;
  }

  .leaderboard-box {
    text-align: left;
  }

  .empty-container {
    text-align: center;
    font-size: 16px;
  }

  .chart-container {
    margin-top: -20px;
  }

  .table-filter-container {
    .active-filter {
      color: #0d6efd;
      font-weight: bold;
      
      a {
        text-decoration: none;
        border: 0;
      }
    }
  }
</style>

<script>
import axios from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'AppLeaderboard',
  components: {
    Bar
  },
  data() {
    return {
      stepsData: [],
      view: 'today',
      userFilter: '',
      hasData: false,
      barChartData: {},
      barChartOptions: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: ''
          }
        }
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.stepsData = [];
      this.hasData = false;
      // Filter by username
      // let usernameQuery = '';
      // Filter by start-datetime
      let startQuery = '';
      // Filter by end-datetime
      let endQuery = '';
      // concat query-params
      let queryParams = '';

      // If it is not the Logging-View, queryParams for the displayed timeframe must be set
      if (this.view !== 'log') {
        const dayInMs = 24 * 60 * 60 * 1000; // ms in one day
        let now = new Date();
        endQuery = this.getDateTimeFormat(now); // Current datetime
        if (this.view === 'today') {
          // Last 24 hours (now - 24 hours)
          let yesterday = new Date(now - dayInMs);
          startQuery = this.getDateTimeFormat(yesterday);
        } else if (this.view === 'week') {
          // Last week (now - 7 days)
          let lastWeek = new Date(now - (7 * dayInMs));
          startQuery = this.getDateTimeFormat(lastWeek);
        } else if (this.view === 'month') {
          // Last month (now - 30 days)
          let lastMonth = new Date(now - (30 * dayInMs));
          startQuery = this.getDateTimeFormat(lastMonth);
        }
        // Concat date filter values
        queryParams += '?end=' + endQuery + ((startQuery !== '') ? ('&start=' + startQuery) : '');
      } else if (this.userFilter && this.userFilter !== '') {
        // If the userFilter in the logging is set, only get data from one user
        queryParams += '?username=' + encodeURI(this.userFilter);
      }

      try {
        const response = await axios.get('http://174.138.68.148/api/steps' + queryParams);
        this.stepsData = response.data;
        // Prepare Chart-Config, if it's not the Logging-View
        if (this.view !== 'log') {
          let labels = [];
          let steps = [];
          let counter = 1;
          this.stepsData.forEach(stepData => {
            if (stepData.username && stepData.steps) {
              labels.push(counter.toString() + '. ' + stepData.username);
              steps.push(stepData.steps);
              counter++;
            }
          });

          this.barChartData = {
            labels: labels,
            datasets: [{
              label: 'Steps',
              data: steps,
              borderColor: '#0d6efd',
              backgroundColor: '#8eaddb'
            }]
          };
        }
        this.hasData = true;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    changeView(newView) {
      this.view = newView;
      // If the new view is not the Logging-View, reset the userFilter
      if (newView !== 'log' && this.userFilter !== '') this.userFilter = '';
      this.fetchData();
    },
    showDataByUsername(username) {
      this.view = 'log';
      this.userFilter = username;
      this.fetchData();
    },
    getDateTimeFormat(date) {
      return encodeURI(`${date.getFullYear()}-${this.numAddLeadingZero(date.getMonth() + 1)}-${this.numAddLeadingZero(date.getDate())} ${this.numAddLeadingZero(date.getHours())}:${this.numAddLeadingZero(date.getMinutes())}:${this.numAddLeadingZero(date.getSeconds())}`);
    },
    numAddLeadingZero(num) {
      return (num < 10) ? ('0' + num.toString()) : num.toString();
    }
  }
}
</script>
